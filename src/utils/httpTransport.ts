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

type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTPTransport {
  get(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    const urlWithQueryParams = new URL(url);
    const { data, ...otherOptions } = options;

    if (data && typeof data === 'object') {
      Object.entries(data).forEach(([key, value]) => {
        urlWithQueryParams.searchParams.set(key, value);
      });
    }

    return this.request(
      urlWithQueryParams,
      {
        ...otherOptions,
        method: METHOD.GET,
      },
      options.timeout,
    );
  }

  post(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return this.request(
      url,
      {
        ...options,
        method: METHOD.POST,
      },
      options.timeout,
    );
  }

  put(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return this.request(
      url,
      {
        ...options,
        method: METHOD.PUT,
      },
      options.timeout,
    );
  }

  delete(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return this.request(
      url,
      {
        ...options,
        method: METHOD.DELETE,
      },
      options.timeout,
    );
  }

  request(
    url: string | URL,
    options: Options = { method: METHOD.GET },
    timeout = 5000,
  ): Promise<XMLHttpRequest> {
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
        resolve(xhr);
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

export { HTTPTransport };
