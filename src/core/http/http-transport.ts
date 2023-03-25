enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  headers?: Record<string, string>;
  data?: Record<string, string>;
  timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method' | 'data'>;

class HttpTransport {
  resource;

  constructor(resource: string) {
    this.resource = resource;
  }

  _getURL(url: string): string {
    return `${this.resource}${url}`;
  }

  get<Response>(
    path: string,
    query: Record<string, string> = {},
    options: OptionsWithoutMethod = {},
  ): Promise<Response> {
    const urlWithQueryParams = new URL(this._getURL(path));
    const { timeout, ...otherOptions } = options;

    if (query && typeof query === 'object') {
      Object.entries(query).forEach(([key, value]) => {
        urlWithQueryParams.searchParams.set(key, value);
      });
    }

    return this.request(
      urlWithQueryParams,
      {
        ...otherOptions,
        method: METHOD.GET,
      },
      timeout,
    );
  }

  post<
    Request extends Record<string, string> = Record<string, string>,
    Response = never,
  >(
    path: string,
    data?: Request,
    options: OptionsWithoutMethod = {},
  ): Promise<Response> {
    return this.request<Response>(
      this._getURL(path),
      {
        data,
        ...options,
        method: METHOD.POST,
      },
      options.timeout,
    );
  }

  put(
    path: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return this.request(
      this._getURL(path),
      {
        ...options,
        method: METHOD.PUT,
      },
      options.timeout,
    );
  }

  delete(
    path: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return this.request(
      this._getURL(path),
      {
        ...options,
        method: METHOD.DELETE,
      },
      options.timeout,
    );
  }

  request<Response = any>(
    url: string | URL,
    options: Options = { method: METHOD.GET },
    timeout = 5000,
  ): Promise<Response> {
    const { method, headers, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.timeout = timeout;

      if (headers && typeof headers === 'object') {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export { HttpTransport };
