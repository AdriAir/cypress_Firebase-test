import { Method, URL } from "../../types";

export class HttpService<T> {
    get(url: URL): Promise<T[]> {
        return fetch(url).then((response) => response.json());
    }

    post(url: URL, options: Object = {}): Promise<Response> {
        return fetch(url, {
            method: Method.POST,
            body: JSON.stringify(options),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        }).then((response) => response.json());
    }

    delete(url: URL): Promise<Response> {
        return fetch(url, {
            method: Method.DELETE,
        }).then((response) => response.json());
    }

    put(url: URL, options: Object = {}): Promise<Response> {
        return fetch(url, {
            method: Method.PUT,
            body: JSON.stringify(options),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        }).then((response) => response.json());
    }
}
