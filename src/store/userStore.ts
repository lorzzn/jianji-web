import { apiTest } from "@/api/test";
import { action, makeAutoObservable } from "mobx";


class UserStore {
  constructor() {
    makeAutoObservable(this)
    this.fetchUserInfo()
  }

  loading = false
  userInfo = {
    email: "ceo@google.com",
    username: "CEOC",
    avatar: "https://himg.bdimg.com/sys/portraitn/item/public.1.df9ab8de.OtFlSDLV3ZMn-MpRiMHxTA",
    picture: ""
  } 

  @action
  fetchUserInfo = async () => {
    try {
      const res = await apiTest.reqInfo()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

}

export default UserStore
