export type DebugResult = {
  success: boolean;
  status?: number;
  statusText?: string;
  headers: Record<string, string>;
  rawBody: string;
  parsedBody?: any;
  corsHeaders: {
    allowOrigin?: string;
    allowCredentials?: string;
    allowMethods?: string;
  };
  cacheHeaders: {
    eTag?: string;
    cacheControl?: string;
    lastModified?: string;
  };
  error?: string;
  duration: number;
};

export async function debugUserProductsEndpoint(
  baseUrl: string,
  accessToken: string,
): Promise<DebugResult> {
  const startTime = performance.now();
  const result: DebugResult = {
    success: false,
    headers: {},
    corsHeaders: {},
    cacheHeaders: {},
    rawBody: "",
    duration: 0,
  };

  if (!baseUrl || typeof baseUrl !== "string") {
    result.error = "baseUrl is missing or invalid";
    result.duration = Math.round(performance.now() - startTime);
    return result;
  }

  if (!accessToken || typeof accessToken !== "string") {
    result.error = "accessToken is missing or invalid";
    result.duration = Math.round(performance.now() - startTime);
    return result;
  }

  try {
    const safeBaseUrl = baseUrl.replace(/\/+$/, "");

    const url = `${safeBaseUrl}/user/products?access_token=${encodeURIComponent(
      accessToken,
    )}`;

    console.log("🔍 DEBUG: Fetching", url);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    let response: Response;

    try {
      response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        cache: "no-store",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    result.status = response.status;
    result.statusText = response.statusText;

    const allHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      allHeaders[key] = value;
    });
    result.headers = allHeaders;

    result.corsHeaders = {
      allowOrigin:
        response.headers.get("access-control-allow-origin") || undefined,
      allowCredentials:
        response.headers.get("access-control-allow-credentials") || undefined,
      allowMethods:
        response.headers.get("access-control-allow-methods") || undefined,
    };

    result.cacheHeaders = {
      eTag: response.headers.get("etag") || undefined,
      cacheControl: response.headers.get("cache-control") || undefined,
      lastModified: response.headers.get("last-modified") || undefined,
    };

    result.rawBody = await response.text();

    if (result.rawBody) {
      const contentType = response.headers.get("content-type") || "";
      const looksJson =
        contentType.includes("application/json") ||
        result.rawBody.trim().startsWith("{") ||
        result.rawBody.trim().startsWith("[");

      if (looksJson) {
        try {
          result.parsedBody = JSON.parse(result.rawBody);
        } catch {
          console.warn("⚠️ Response JSONga o‘xshaydi, lekin parse bo‘lmadi.");
        }
      }
    }

    result.success = response.ok;

    if (!response.ok) {
      const preview = result.rawBody ? result.rawBody.slice(0, 200) : "";
      result.error = `HTTP ${response.status}: ${result.statusText}${
        preview ? ` | Body: ${preview}` : ""
      }`;
    }

    result.duration = Math.round(performance.now() - startTime);
    return result;
  } catch (e: unknown) {
    const err = e as { name?: string; message?: string };

    if (err?.name === "AbortError") {
      result.error =
        "Request timeout (15s). Backend javob bermadi yoki internet sekin.";
    } else {
      result.error = err?.message || "Unknown error";
    }

    result.duration = Math.round(performance.now() - startTime);
    return result;
  }
}

export function logDebugResult(result: DebugResult): void {
  console.group("🔧 API Debug Result");

  console.log("✅ Success:", result.success);
  console.log(
    "📊 Status:",
    `${result.status ?? "?"} ${result.statusText ?? ""}`.trim(),
  );
  console.log("⏱️ Duration:", `${result.duration}ms`);

  if (result.error) {
    console.error("❌ Error:", result.error);
  }

  console.group("📡 CORS Headers");
  console.table(result.corsHeaders);
  console.groupEnd();

  console.group("💾 Cache Headers");
  console.table(result.cacheHeaders);
  console.groupEnd();

  console.group("📝 All Response Headers");
  console.table(result.headers);
  console.groupEnd();

  console.group("📦 Response Body");
  if (result.parsedBody !== undefined) {
    console.log("Parsed JSON:", result.parsedBody);
  } else {
    console.log("Raw text:", result.rawBody);
  }
  console.groupEnd();

  console.group("🔍 Diagnostic Hints");

  if (!result.corsHeaders.allowOrigin) {
    console.warn(
      "⚠️ No Access-Control-Allow-Origin header. Backend CORS localhostni ruxsat bermayotgan bo‘lishi mumkin.",
    );
  }

  if (result.status === 304) {
    console.warn(
      "⚠️ Got 304 Not Modified. Response body bo‘sh bo‘lishi mumkin (cached).",
    );
  }

  if (result.parsedBody) {
    const body = result.parsedBody;
    const isArray = Array.isArray(body);
    const hasProductsKey = Array.isArray(body?.products);
    const hasDataKey = Array.isArray(body?.data);

    if (!isArray && !hasProductsKey && !hasDataKey) {
      console.warn(
        "⚠️ Response shape unclear. Expected array, {products: []}, or {data: []}.",
      );
      if (typeof body === "object") {
        console.log("   Got keys:", Object.keys(body).join(", "));
      } else {
        console.log("   Got type:", typeof body);
      }
    }

    const list = isArray
      ? body
      : hasProductsKey
        ? body.products
        : hasDataKey
          ? body.data
          : null;

    if (Array.isArray(list)) {
      console.log(`🧾 Products count: ${list.length}`);
    }
  }

  console.groupEnd();
  console.groupEnd();
}
