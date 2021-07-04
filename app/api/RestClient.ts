import { METHOD } from "@constant/index";
import axios from "axios";

function Request() {
  async function requestApi(
    method: METHOD,
    url: string,
    options?: any,
    dataRequest?: any,
    token?: string
  ) {
    try {
      const requestToken = `Bearer ${token}`;
      let response = await axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: requestToken,
        },
        ...options,
        data: dataRequest,
        url,
        method,
      });
      let { data } = response;
      return [data, data?.message];
    } catch (error) {
      return [null, error, error?.message];
    }
  }

  function get(url: string, options = {}, token?: string) {
    return requestApi(METHOD.GET, url, options, null, token);
  }

  async function post(url: string, data: any, token?: string) {
    return requestApi(METHOD.POST, url, null, data, token);
  }

  function put(url: string, data: any, token?: string) {
    return requestApi(METHOD.PUT, url, null, data, token);
  }

  function remove(url: string, data = {}, token?: string) {
    return requestApi(METHOD.DELETE, url, null, data, token);
  }

  function patch(url: string, data: any, token?: string) {
    return requestApi(METHOD.PATCH, url, null, data, token);
  }

  return { get, post, put, patch, delete: remove };
}

export default Request();
