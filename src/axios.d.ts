import 'axios';

declare module 'axios' {   
  export interface AxiosRequestConfig {
    encrypt?: boolean;   
    withToken?: boolean;
  }
}
