import axios from 'axios';
import type{ AxiosInstance,InternalAxiosRequestConfig,AxiosRequestConfig,AxiosError,AxiosResponse,} from 'axios';
import type{ ResponseModel, UploadFileItemModel, UploadRequestConfig } from '@/interfaces/index'
import { CodeConfig } from '@/interfaces/CodeConfig'
const timeoutSetting = 5*1000;
class HttpRequest {
  service: AxiosInstance
  constructor(){
    this.service = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_URL,
      timeout: timeoutSetting
    });
    /**請求前攔截 */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
          /**
           * set your config
           */
          if (import.meta.env.VITE_APP_TOKEN_KEY) {
              // carry token
              // config.headers[import.meta.env.VITE_APP_TOKEN_KEY] = getToken()
          }
          return config
      },
      (error: AxiosError) => {
          console.log('requestError: ', error)
          return Promise.reject(error);
      },
      {
          synchronous: false,
          runWhen: ((config: InternalAxiosRequestConfig) => {
              // do something
              console.log(config)
              // if return true, axios will execution interceptor method
              return true
          })
      }
    );
    /**response 攔截 */
    this.service.interceptors.response.use(
      (response: AxiosResponse<ResponseModel>): AxiosResponse['data'] => {
          const { data } = response
          const { code } = data
          if (code) {
              if (code != CodeConfig.success) {
                  switch (code) {
                      case CodeConfig.notFound:
                          // the method to handle this code
                          break;
                      case CodeConfig.noPermission:
                          // the method to handle this code
                          break;
                      default:
                          break;
                  }
                  return Promise.reject(data.message)
              } else {
                  return data
              }
          } else {
              return Promise.reject('Error! code missing!')
          }
      },
      (error: any) => {
          return Promise.reject(error);
      }
    );
  }
  request<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    /**
     * TODO: execute other methods according to config
     */
    return new Promise((resolve, reject) => {
        try {
          this.service.request<ResponseModel<T>>(config)
            .then((res: AxiosResponse['data']) => {
              console.log(res)
              resolve(res as ResponseModel<T>);
            })
            .catch((err) => {
                reject(err)
            })
        } catch (err) {
          return Promise.reject(err)
        }
    })
  }
  get<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    console.log(this.request({ method: 'GET', ...config }))
    return this.request({ method: 'GET', ...config })
  }
  post<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
      return this.request({ method: 'POST', ...config })
  }
  put<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
      return this.request({ method: 'PUT', ...config })
  }
  delete<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.request({ method: 'DELETE', ...config })
  }
  upload<T = string>(fileItem: UploadFileItemModel, config?: UploadRequestConfig): Promise<ResponseModel<T>> | null {
      if (!import.meta.env.VITE_UPLOAD_URL) return null

      const fd = new FormData()
      fd.append(fileItem.name, fileItem.value)
      let configCopy: UploadRequestConfig
      if (!config) {
          configCopy = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
      } else {
          config.headers!['Content-Type'] = 'multipart/form-data'
          configCopy = config
      }
      return this.request({ url: import.meta.env.VITE_UPLOAD_URL, data: fd, ...configCopy })
  }

}

const httpRequest = new HttpRequest()
export default httpRequest;
// import {ElLoading,ElMessage} from 'element-plus';
// import { BASEURL } from '../utils/baseUrl.js'
// import { useAuthStore } from '../store/authSetting'
// import {getTokenAUTH} from '@/utils/auth';`
// const timeoutSetting = 30000;
// const pendingMap = new Map();

// const LoadingInstance = {_target: null,_count: 0};

// function API(axiosConfig, customOptions, loadingOptions) {
//   const AuthStore = useAuthStore();
//   // 自定義設定
//   let custom_options = Object.assign({
//     CROS:false,
//     repeatRequestCancel: true, // 取消重复请求, 預設為 true
//     loading: true, // loading效果, 預設為false
//     reDuctDataFormat: true, // 簡潔的數據結構回應, 預設為true--直接取response.data
//     error_message_show: true, // 錯誤訊息顯示,預設為true
//     keep:false,//是否服務錯誤後繼續執行後續程式預設為false
//     code_message_show: false, // code不为0時的提示, 預設為false
//     ContentType:false,
//     CacheControl:false,
//     token:true
//   }, customOptions);
//   const service = axios.create({baseURL: custom_options.CROS?axiosConfig.url:BASEURL, timeout: timeoutSetting,});


//   // 請求攔截
//   service.interceptors.request.use(
//     config => {
//       if (custom_options.repeatRequestCancel){
//         existInPending(config) ? removePending(config) : addPending(config)
//       }
//       // loading
//       if (custom_options.loading) {
//         LoadingInstance._count++;
//         if (LoadingInstance._count === 1) {
//           LoadingInstance._target = ElLoading.service(loadingOptions);
//         }
//       }
//       if (custom_options.ContentType) {
//         config.headers['Content-Type'] = custom_options.ContentType
//       }
//       if (custom_options.CacheControl) {
//         config.headers['Cache-Control'] = custom_options.CacheControl
//       }

//       if (custom_options.responseType) {
//         config.responseType = custom_options.responseType
//       }
//       // token設置
//       // if (getTokenAUTH() && typeof window !== "undefined") {
//       //   config.headers.Authorization = getTokenAUTH();
//       // }
//       if (AuthStore.GetTokenState&&custom_options.token) {
//         config.headers.Authorization = `Bearer ${AuthStore.GetTokenState}`
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );

//   // 回應攔截
//   service.interceptors.response.use(
//     response => {
//       removePending(response.config);
//       custom_options.loading && closeLoading(custom_options); // 關閉loading

//       if (custom_options.code_message_show && response.data && response.data.code !== 0) {
//         ElMessage({
//           type: 'error',
//           message: response.data.message
//         })
//         return Promise.reject(response.data); // code不等于0
//       }

//       return custom_options.reDuctDataFormat ? response.data : response;
//     },
//     async (error) => {
//       if (error.response && error.response.status === 401) {


//         try {
//           await AuthStore.getToken();

//           if (AuthStore.GetTokenState) {
//             const axiosConfig = error.config;
//             removePending(axiosConfig); // 移除当前请求
//             custom_options.loading && closeLoading(custom_options); // 关闭 loading

//             // 设置新 token
//             axiosConfig.headers.Authorization = `Bearer ${AuthStore.GetTokenState}`;
//             console.log('重新取Token');
//             return service(axiosConfig); // 重新发送请求并返回其结果
//           }
//         } catch (tokenError) {
//           console.error('Token 獲取失敗:', tokenError);
//           custom_options.error_message_show && httpErrorStatusHandle(tokenError); // 错误状态处理
//           return custom_options.keep ? Promise.resolve(null) : Promise.reject(tokenError); // 错误显示
//         }
//       }


//       // if (error.response && error.response.status === 401) {
//       //   console.log('執行');

//       //   await AuthStore.getToken()
//       //   if (AuthStore.GetTokenState) {
//       //     console.log(error.config);

//       //     await API(axiosConfig, customOptions, loadingOptions)
//       //   }
//       //   error.config && removePending(error.config);
//       //   custom_options.loading && closeLoading(custom_options); // 關閉loading
//       //   return
//       // }


//       custom_options.loading && closeLoading(custom_options); // 关闭 loading
//       custom_options.error_message_show && httpErrorStatusHandle(error); // 錯誤帶法對應處理
//       return custom_options.keep?Promise.resolve(null):Promise.reject(error); // 錯誤顯示
//     }
//   );

//   return service(axiosConfig)
// }

// export default API;

// /**
//  * 異常代碼處理
//  * @param {*} error
//  */
// function httpErrorStatusHandle(error) {
//   // 重複請求處理
//   if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message);
//   let message = '';
//   if (error && error.response) {
//     switch (error.response.status) {
//       case 302:
//         message = '路徑已被重新導向！';
//         break;
//       case 400:
//         message = '參數錯誤！';
//         break;
//       case 401:
//         message = '未登入或登入超時，請重新登入';
//         break;
//       case 403:
//         message = '權限不足無法操作！';
//         break;
//       case 404:
//         // message = `請求路徑出錯: ${error.response.config.url}`;
//         message = `請求路徑出錯`;
//         break; // 在同域名下
//       case 408:
//         message = '連線逾時';
//         break;
//       case 409:
//         message = '系统已存在相同請求！';
//         break;
//       case 500:
//         message = '服務内部錯誤！';
//         break;
//       case 501:
//         message = '服務未實作！';
//         break;
//       case 502:
//         message = '無效的閘道！';
//         break;
//       case 503:
//         message = '服務無法使用！';
//         break;
//       case 504:
//         message = '服務暫時無法訪問，請稍候在試！';
//         break;
//       case 505:
//         message = '不支援請求所使用的 HTTP 版本';
//         break;
//       default:
//         message = '異常問題，請連絡相關人員！';
//         break
//     }
//   }
//   if (error.message.includes('timeout')) message = '請求逾時！';
//   if (error.message.includes('Network')) message = window.navigator.onLine ? '伺服器異常！' : '網路連接已中斷！';

//   ElMessage({type: 'error',message})
// }

// /**
//  * loading關閉
//  * @param {*} _options
//  */
// function closeLoading(_options) {
//   if (_options.loading && LoadingInstance._count > 0) LoadingInstance._count--;
//   if (LoadingInstance._count === 0) {
//     LoadingInstance._target.close();
//     LoadingInstance._target = null;
//   }
// }

// /**
//  * 請求的callback
//  * @param {*} config
//  */
// function addPending(config) {
//   const pendingKey = getPendingKey(config);
//   config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
//     if (!pendingMap.has(pendingKey)) {
//       pendingMap.set(pendingKey, cancel);
//     }
//   });
// }

// /**
//  * 删除重複請求
//  * @param {*} config
//  */
// function removePending(config) {
//   const pendingKey = getPendingKey(config);
//   if (pendingMap.has(pendingKey)) {
//     const cancelToken = pendingMap.get(pendingKey);
//     cancelToken(pendingKey);
//     pendingMap.delete(pendingKey);
//   }
// }
// function existInPending(config) {
//   let exist=false;
//   const pendingKey = getPendingKey(config);
//   if (pendingMap.has(pendingKey)) {
//     exist=true;
//   }
//   return exist
// }

// /**
//  * 生成唯一的每个請求的唯一key
//  * @param {*} config
//  * @returns
//  */
// function isJson(str) {
//     try {
//       JSON.parse(str);
//     } catch (e) {
//       return false;
//     }
//     return true;
// }

// function getPendingKey(config) {


//   let {url,method,params,data,headers} = config;
//   if (typeof data === 'string') data = isJson(data)? JSON.parse(data):data ;
//   return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');

// }

