import { HttpTransport } from '../core/http';
import { Router } from '../core';
import { ROUTS } from '../common/constants';

const BASE_URL = 'https://ya-praktikum.tech/api/v2';

const SETTINGS = {
  credentials: 'include',
  mode: 'cors',
  headers: {
    'content-type': 'application/json',
  },
};

class YaPraktikumRequest extends HttpTransport {
  constructor(resource: string) {
    super(`${BASE_URL}${resource}`, SETTINGS);
  }

  interceptor(status: number, response: any): any | never {
    if (status === 401) {
      // пользователь неавторизован
      Router.__instance.go(ROUTS.LOGIN);
      return;
    }

    if (status >= 200 && status < 400) {
      try {
        const responseJson = JSON.parse(response);
        return responseJson;
      } catch {
        return response;
      }
    }

    throw new Error(response);
  }
}

export { YaPraktikumRequest };
