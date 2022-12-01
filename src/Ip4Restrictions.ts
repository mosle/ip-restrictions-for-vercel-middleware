import { next, ipAddress } from "@vercel/edge";
import ip from "ip";

const rejection = (body: string): Response => {
  return new Response(body, {
    status: 403,
    statusText: "Forbidden",
  });
};

const createIp4RestrictionsHandler = (
  iprange: string | string[],
  rejectedText: string = "Forbidden",
  skip: ((request: Request) => boolean | undefined) | boolean = false
): ((request: Request) => Response) => {
  return (request: Request) => {
    if (skip === true || (typeof skip === "function" && skip(request)))
      return next();

    const clientIp = ipAddress(request);
    if (clientIp) {
      if (typeof iprange === "string") {
        if (ip.cidrSubnet(iprange).contains(clientIp)) return next();
      } else if (
        iprange.some((range) => ip.cidrSubnet(range).contains(clientIp))
      ) {
        return next();
      }
    }

    return rejection(rejectedText);
  };
};

export default createIp4RestrictionsHandler;
