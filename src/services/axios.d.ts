import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { ResponseModel, UploadFileItemModel, UploadRequestConfig } from '@/interfaces/index';
declare class HttpRequest {
    service: AxiosInstance;
    constructor();
    request<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>>;
    get<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>>;
    post<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>>;
    put<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>>;
    delete<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>>;
    upload<T = string>(fileItem: UploadFileItemModel, config?: UploadRequestConfig): Promise<ResponseModel<T>> | null;
}
declare const httpRequest: HttpRequest;
export default httpRequest;
