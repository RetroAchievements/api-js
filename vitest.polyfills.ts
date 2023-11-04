import { Blob } from "node:buffer";
import { TextDecoder, TextEncoder } from "node:util";

import { fetch, FormData, Headers, Request, Response } from "undici";

Reflect.set(globalThis, "TextEncoder", TextEncoder);
Reflect.set(globalThis, "TextDecoder", TextDecoder);

Reflect.set(globalThis, "fetch", fetch);
Reflect.set(globalThis, "Blob", Blob);
Reflect.set(globalThis, "Request", Request);
Reflect.set(globalThis, "Response", Response);
Reflect.set(globalThis, "Headers", Headers);
Reflect.set(globalThis, "FormData", FormData);
