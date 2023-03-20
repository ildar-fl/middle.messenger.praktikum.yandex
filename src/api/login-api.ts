import { HttpTransport, BaseApi } from 'core';

type LoginRequest = any;
type LoginResponse = Promise<XMLHttpRequest>;

const authAPIInstance = new HttpTransport('api/v1/auth');

class LoginAPI extends BaseApi {
  request(user: LoginRequest): LoginResponse {
    return authAPIInstance.post('/login', user); // Обрабатываем получение данных из сервиса далее
  }
}

export { LoginAPI };
