Ip(v4) address restrictions for vercel middleware

## Installation

```sh
npm install --save ip-restrictions-for-vercel-middleware
```

```sh
yarn add ip-restrictions-for-vercel-middleware
```

## Usage

### add "PROJECT_ROOT/middleware.(js | ts)"

directory structure:

```
├── ...
├── middleware.js
└── ...
```

### edit "PROJECT_ROOT/middleware.(js | ts)"

like

```js
import { createHandler } from "ip-restrictions-for-vercel-middleware";
export default createHandler("192.168.0.1/32"); //pass cidr as argument

//if you use matcher
/*
export const config = {
  matcher: "/",
};
*/
```

```js
import { createHandler } from "ip-restrictions-for-vercel-middleware";
export default createHandler("192.168.0.1/32", "message for forbidden");
```

```js
//3rd parameter is skip flag(function or boolean)
import { createHandler } from "ip-restrictions-for-vercel-middleware";
export default createHandler(
  "192.168.0.1/32",
  "message for forbidden"
  (request) =>
    request.headers.get("user-agent")?.includes("user-agent-for-cdn-robot")
);
```

```js
import { createHandler } from "ip-restrictions-for-vercel-middleware";
export default createHandler(["192.168.0.1/32", "192.168.1.1/24"]);
// multiple ip range
```
