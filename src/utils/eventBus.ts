import mitt from 'mitt'

const eventBus = mitt()

export const events = {
  beforeResetUserInfo: "beforeResetUserInfo",
  afterUserLogout: "afterUserLogout" 
}

export default eventBus
