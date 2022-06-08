export const paths = {
  home: () => `/`,
  me: () => `/profile`,
  profile: (id: `:id`) => `/profile/${id}`,
  about: () => `/about`,
  account: () => `/account`,
  accountInner: () => `/account-inner`,
}
