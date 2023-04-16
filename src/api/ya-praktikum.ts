import { HttpTransport } from '../core/http';

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
      throw new Error('Пользователь не авторизован');
    }

    if (status >= 200 && status < 400) {
      const responseJson = JSON.parse(response);
      return responseJson;
    }

    throw new Error(response);
  }
}

export { YaPraktikumRequest };
