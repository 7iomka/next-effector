/* eslint-disable require-atomic-updates */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-props-no-spreading */

import {
  allSettled,
  createEvent,
  createStore,
  Event,
  fork,
  sample,
  Scope,
  serialize,
} from 'effector'
import { Provider, useEvent } from 'effector-react/scope'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPageContext,
  PreviewData,
} from 'next'
import App, { AppProps } from 'next/app'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useMemo, useRef } from 'react'

// eslint-disable-next-line prettier/prettier
type AppType<P = {}, CP = {}, S = {}> =
  new (props: AppProps<P>) => App<P, CP, S>

interface Values {
  [sid: string]: any
}

interface AnyProps {
  [key: string]: any
}

const isClient = typeof window !== 'undefined'
const isServer = !isClient

const INITIAL_STATE_KEY = '__EFFECTOR_NEXTJS_INITIAL_STATE__'
const CALLED_MAP_SID = '__EFFECTOR_NEXTJS_CALLED_MAP__'

export type ServerSidePropsEvent<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = Event<GetServerSidePropsContext<Q, D>> | Event<void>

export type InitialPropsEvent = Event<NextPageContext> | Event<void>

export type StartEvent = ServerSidePropsEvent<any, any> | InitialPropsEvent

export async function startEffectorModel<TContext>(
  events: Array<Event<TContext> | Event<void>>,
  context: TContext,
  existingScope?: Scope | null
) {
  const scope = existingScope ?? fork()

  // Always run events sequentially to prevent any race conditions
  for (const event of events)
    await allSettled(event as Event<TContext>, { scope, params: context })

  return {
    scope,
    props: { [INITIAL_STATE_KEY]: serialize(scope) },
  }
}

export interface CreateAppGSSPConfig {
  appEvent?: ServerSidePropsEvent
}

export interface CreateGSSPConfig<
  P extends AnyProps,
  Q extends ParsedUrlQuery,
  D extends PreviewData
> {
  pageEvent?: ServerSidePropsEvent
  create?: (scope: Scope) => GetServerSideProps<P, Q, D>
}

export function createAppGetServerSideProps({
  appEvent,
}: CreateAppGSSPConfig = {}) {
  return function createGetServerSideProps<
    P extends AnyProps = AnyProps,
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
  >({ pageEvent, create }: CreateGSSPConfig<P, Q, D> = {}): GetServerSideProps<
    P,
    Q,
    D
  > {
    return async function getServerSideProps(context) {
      const isEvent = (value: unknown): value is ServerSidePropsEvent =>
        Boolean(value)

      /*
       * In GSSP, always run both "appEvent" and "pageEvent"
       */
      const events = [appEvent, pageEvent].filter(isEvent)

      /*
       * Execute app and page Effector events,
       * and wait for model to settle
       */
      const { scope, props } = await startEffectorModel(events, context)

      /*
       * Get user's GSSP result
       * Fallback to empty props object if no custom GSSP used
       */
      const gsspResult = create
        ? await create(scope)(context)
        : { props: {} as P }

      const hasProps = 'props' in gsspResult

      /*
       * Pass 404 and redirects as they are
       */
      if (!hasProps) {
        return gsspResult
      }

      /*
       * Mix serialized Effector Scope values into the user props
       */
      gsspResult.props = await gsspResult.props
      Object.assign(gsspResult.props, props)

      return gsspResult
    }
  }
}

let currentScope: Scope | null = null

type GetInitialProps<P> = (context: NextPageContext) => Promise<P>

export interface CreateAppGIPConfig {
  appEvents?: InitialPropsEvent[]
}

export interface CreateGIPConfig<P> {
  pageEvents?: InitialPropsEvent[]
  create?: (scope: Scope) => GetInitialProps<P>
}

// #region Experimental Called State

type AnyEvent = Event<any> | Event<void>
type CalledMap = Record<string, boolean>
const $calledMap = createStore<CalledMap>({}, { sid: CALLED_MAP_SID })
const wrappedEventsMap = new Map<AnyEvent, AnyEvent>()

function wrapAppEvent(event: AnyEvent): AnyEvent {
  const existingWrapper = wrappedEventsMap.get(event)
  if (existingWrapper) return existingWrapper

  const wrapper = createEvent<any>()

  $calledMap.on(event, (map) => {
    if (!event.sid) return map
    return { ...map, [event.sid]: true }
  })

  const $hasCalled = $calledMap.map((map) => {
    if (!event.sid) return false
    return Boolean(map[event.sid])
  })

  sample({
    source: wrapper,
    filter: $hasCalled.map((is) => !is),
    target: event,
  })

  wrappedEventsMap.set(event, wrapper)
  return wrapper
}

function useWrappedAppEvent(appEvent: AnyEvent) {
  const wrappedAppEvent = useMemo(() => wrapAppEvent(appEvent), [appEvent])
  return useEvent(wrappedAppEvent)
}

// #endregion

export function createAppGetInitialProps({
  appEvents,
}: CreateAppGIPConfig = {}) {
  const wrappedAppEvents = appEvents
    .filter(Boolean)
    .map((appEvent) => wrapAppEvent(appEvent))

  return function createGetInitialProps<P extends AnyProps = AnyProps>({
    pageEvent,
    create,
  }: CreateGIPConfig<P> = {}): GetInitialProps<P> {
    return async function getInitialProps(context) {
      const isEvent = (value: unknown): value is InitialPropsEvent =>
        Boolean(value)

      /*
       * Determine the Effector events to run
       *
       * On server-side, use both app and page events
       *
       * On client-side, use only page event,
       * as we don't want to run app event again
       */
      const events = [...wrappedAppEvents, pageEvent].filter(isEvent)

      /*
       * Execute resulting Effector events,
       * and wait for model to settle
       */
      const { scope, props } = await startEffectorModel(
        events,
        context,
        currentScope // Use already existing Scope on the client side
      )

      /*
       * On client-side, save the newly created Scope inside scopeMap
       * We need it to access on user navigation (see code above)
       */
      if (isClient) {
        currentScope = scope
      }

      /*
       * Get user's GIP props
       * Fallback to empty object if no custom GIP used
       */
      const userProps = create ? await create(scope)(context) : ({} as P)

      return Object.assign(userProps, props)
    }
  }
}

export function useScope(values: Values = {}) {
  const valuesRef = useRef<Values | null>(null)

  if (isServer) {
    return fork({ values })
  }

  /*
   * Client first render
   * Create the new Scope and save it globally
   * We need it to be accessable inside getInitialProps
   */
  if (!currentScope) {
    const nextScope = fork({ values })

    currentScope = nextScope
    valuesRef.current = values
  }

  /*
   * Values have changed, most likely it's happened on the user navigation
   * Create the new Scope from the old one and save it as before
   */
  if (values !== valuesRef.current) {
    const currentValues = serialize(currentScope)
    const nextValues = Object.assign({}, currentValues, values)
    const nextScope = fork({ values: nextValues })

    currentScope = nextScope
    valuesRef.current = values
  }

  return currentScope
}

export function withEffector<P = {}, CP = {}, S = {}>(App: AppType<P, CP, S>) {
  return function EnhancedApp(props: P & AppProps<CP>) {
    const { [INITIAL_STATE_KEY]: initialState, ...pageProps } = props.pageProps

    const scope = useScope(initialState)

    return (
      <Provider value={scope}>
        <App {...props} pageProps={pageProps} />
      </Provider>
    )
  }
}

// export function useClientAppEvent(appEvents: AnyEvent[]) {

//   const events = appEvents.map((appEvent) => useWrappedAppEvent(appEvent))
//   const event = useWrappedAppEvent(appEvent)
//   useEffect(() => event(), [event])
// }
