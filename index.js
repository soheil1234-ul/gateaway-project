export const config = { runtime: "edge" };

// استفاده از نام متغیر متفاوت برای حساسیت کمتر
const UPSTREAM_ADDR = (process.env.GATEWAY_URL || "").replace(/\/$/, "");

// لیست سیاه هدرها با نام متفاوت
const RESTRICTED_FIELDS = [
  "host", "connection", "upgrade", "forwarded", "te", 
  "transfer-encoding", "keep-alive", "proxy-authorization"
];

export default async function (request) {
  if (!UPSTREAM_ADDR) {
    return new Response("Service Initialization Failed", { status: 500 });
  }

  try {
    const { pathname, search } = new URL(request.url);
    const destination = `${UPSTREAM_ADDR}${pathname}${search}`;

    const secureHeaders = new Headers();
    let sourceAddr = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for");

    for (const [key, value] of request.headers) {
      const lowerKey = key.toLowerCase();
      if (RESTRICTED_FIELDS.includes(lowerKey) || lowerKey.startsWith("x-vercel-")) {
        continue;
      }
      secureHeaders.set(key, value);
    }

    if (sourceAddr) {
      secureHeaders.set("X-Forwarded-For", sourceAddr);
    }

    // اضافه کردن یک هدر رندم برای تغییر اثر انگشت درخواست (Fingerprinting)
    secureHeaders.set("X-Request-Trace-Id", Math.random().toString(36).substring(7));

    const response = await fetch(destination, {
      method: request.method,
      headers: secureHeaders,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
      duplex: "half",
      redirect: "manual",
    });

    return response;
  } catch (e) {
    return new Response("Gateway Connectivity Error", { status: 502 });
  }
}
