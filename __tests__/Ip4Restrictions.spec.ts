import { createHandler } from "../src/index";

describe("", () => {
  test("rejected", () => {
    const handler = createHandler("192.168.0.1/32");

    const req = new Request("https://example.com/");
    const res = handler(req);
    expect(res.status).toBe(403);
  });
  test("passed 1", () => {
    const handler = createHandler("192.168.0.1/32");
    const req = new Request("https://example.com/", {
      headers: {
        "x-real-ip": "192.168.0.1",
      },
    });
    const res = handler(req);
    expect(res.status).toBe(200);
  });

  test("passed 2", () => {
    const handler = createHandler("192.168.0.0/24");
    const req = new Request("https://example.com/", {
      headers: {
        "x-real-ip": "192.168.0.1",
      },
    });
    const res = handler(req);
    expect(res.status).toBe(200);
  });

  test("passed 3", () => {
    const handler = createHandler(["192.168.0.1/32", "192.168.1.1/32"]);
    const req = new Request("https://example.com/", {
      headers: {
        "x-real-ip": "192.168.0.1",
      },
    });
    const res = handler(req);
    expect(res.status).toBe(200);
  });

  test("passed 3", () => {
    const handler = createHandler(["192.168.0.1/32", "192.168.1.1/24"]);
    const req = new Request("https://example.com/", {
      headers: {
        "x-real-ip": "192.168.1.198",
      },
    });
    const res = handler(req);
    expect(res.status).toBe(200);
  });
  test("rejected 1", () => {
    const handler = createHandler("192.168.0.0/24");
    const req = new Request("https://example.com/", {
      headers: {
        "x-real-ip": "192.168.1.1",
      },
    });
    const res = handler(req);
    expect(res.status).toBe(403);
  });

  test("skip normally", () => {
    const handler = createHandler(
      "192.168.0.1/32",
      "forbidden",
      (request: Request) => true
    );

    const req = new Request("https://example.com/");
    const res = handler(req);
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });
});
