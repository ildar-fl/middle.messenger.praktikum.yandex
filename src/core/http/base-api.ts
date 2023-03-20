class BaseApi {
  create() {
    throw new Error('Not implemented');
  }

  request<Request>(props?: Request) {
    throw new Error(`Not implemented, props = ${props}`);
  }

  update() {
    throw new Error('Not implemented');
  }

  delete() {
    throw new Error('Not implemented');
  }
}

export { BaseApi };
