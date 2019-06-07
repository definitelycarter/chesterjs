const originalFetch = window.fetch;

export function fetchMock() {
  const context = new FetchMockContext();
  window.fetch = createFetchMock(context);
  return context;
}

const createFetchMock = (context: FetchMockContext) => async (
  input: RequestInfo,
  init?: RequestInit
) => {
  let url: string;
  let method: RequestInit['method'] = (init && init.method) || 'GET';
  if (typeof input === 'string') {
    url = input;
  } else {
    url = input.url;
  }

  const route = context.match(url, method);
  if (!route) {
    return originalFetch(input, init);
  }

  if (!route.response) {
    const response = originalFetch(input, init);
    route.response = response;
    return response;
  }
  const response = new Response(JSON.stringify(route.response));
  return Promise.resolve(response);
};

class FetchMockContext {
  private routes: Route<unknown>[] = [];
  route<T>(method: string, url: RegExp, body: T): Promise<T> {
    const route = new Route(method, url, body);
    this.routes.push(route);
    // @ts-ignore
    return route;
  }

  match(url: string, method: string): Route<any> | null {
    const routes = this.routes.filter(r => r.match(url, method));
    if (!routes.length) return null;
    if (routes.length === 1) return routes[0];
    throw new Error('There was more than one match for this route');
  }
}

class Route<T> {
  [Symbol.toStringTag] = 'Route<T>';
  private waiting: boolean = false;
  private resolved: boolean = false;
  private promise: Promise<T> = new Promise(resolve => {
    const wrapper = () => {
      if (!this.waiting) return;
      clearInterval(interval);
      if (this.resolved) return resolve(this.response);
      throw new Error(`The route ${this.url.source} was not met`);
    };
    let interval = setInterval(wrapper, 50);
  });
  constructor(
    private method: string,
    private url: RegExp,
    public response: T
  ) {}

  then(
    onfulfilled?: ((value: T) => T | PromiseLike<T>) | null | undefined,
    onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined
  ) {
    this.waiting = true;
    return this.promise.then(onfulfilled, onrejected);
  }

  catch(onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined) {
    this.waiting = true;
    return this.promise.catch(onrejected);
  }

  finally(onfinally?: (() => void) | null | undefined) {
    this.waiting = true;
    return this.promise.finally(onfinally);
  }

  match(url: string, method: string): boolean {
    if (this.method !== method || !this.url.test(url)) {
      return false;
    }

    this.resolved = true;
    return this.resolved;
  }
}
