import type { AxiosRequestConfig } from 'axios'
/**respons 回應格式 */
export interface ResponseModel<T = any> {
  success: boolean;
  message: string | null;
  code: number | string;
  data: T;
}
/**檔案參數 */
export interface UploadFileItemModel {
  name: string,
  value: string | Blob
}


/**
 * customize your uploadRequestConfig
 */
export type UploadRequestConfig = Omit<AxiosRequestConfig, 'url' | 'data'>

