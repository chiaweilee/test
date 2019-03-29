type ResponseType =
  | "basic"
  | "cors"
  | "default"
  | "error"
  | "opaque"
  | "opaqueredirect";

interface Response extends Body {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}

export default function(): Promise<Response> {
  // @ts-ignore
  return new Promise((resolve, reject) => {
    class Response {
      static get ok() {
        return true;
      }
    }

    resolve(class response extends Response {});
  });
}
