import service from "@/utils/service"


export const apiTest = {

  reqInfo(data?: any) {
    return service({
      method: "POST",
      url: "/test/req_info",
      data
    })
  }
}
