import mitt from "mitt"

const eventBus = mitt()
export const events = {
  beforeResetUserInfo: "beforeResetUserInfo",
  afterUserLogout: "afterUserLogout",
  userAuthorizationExpired: "userAuthorizationExpired",
  ScrollToTop: "ScrollToTop",
}

export default eventBus
