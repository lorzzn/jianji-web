import { action, makeAutoObservable } from "mobx";


class UserStore {
  constructor() {
    makeAutoObservable(this)
  }

  loading = false
  userInfo = {
    email: "ceo@google.com",
    username: "CEOC",
    avatar: "https://himg.bdimg.com/sys/portraitn/item/public.1.df9ab8de.OtFlSDLV3ZMn-MpRiMHxTA",
    picture: ""
  } 

}

export default UserStore
