/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosInstance, AxiosResponse } from 'axios'

export interface IRequestOptions {
  header?: object
  params?: object
}

class HttpAdapter {
  private http: AxiosInstance

  constructor(private baseUrl = '') {
    this.http = axios.create({ baseURL: this.baseUrl })
  }

  async get<T>(url: string, requestOptions?: IRequestOptions): Promise<AxiosResponse<T>> {
    const header = {
      ...requestOptions?.header
    }
    return this.http.get(url, {
      params: requestOptions?.params,
      headers: header
    })
  }

  async post<T>(url: string, body: object, requestOptions?: IRequestOptions): Promise<AxiosResponse<T>> {
    return this.http.post(url, body, {
      params: requestOptions?.params
    })
  }

  async put<T>(url: string, body: object, requestOptions?: IRequestOptions): Promise<AxiosResponse<T>> {
    const header = {
      ...requestOptions?.header
    }

    return this.http.put(url, body, {
      params: requestOptions?.params,
      headers: header
    })
  }

  async delete<T>(url: string, body?: object, requestOptions?: IRequestOptions): Promise<AxiosResponse<T>> {
    const header = {
      ...requestOptions?.header
    }

    return this.http.delete(url, {
      params: requestOptions?.params,
      headers: header,
      data: body
    })
  }
}

export default HttpAdapter