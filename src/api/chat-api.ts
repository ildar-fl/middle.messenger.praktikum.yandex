import { HttpTransport, BaseApi } from 'core';

const chatAPIInstance = new HttpTransport('api/v1/chats');

class ChatAPI extends BaseApi {
  create() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return chatAPIInstance.post('/', { title: 'string' });
  }

  request(): Promise<XMLHttpRequest> {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return chatAPIInstance.get('/full');
  }
}

export { ChatAPI };
