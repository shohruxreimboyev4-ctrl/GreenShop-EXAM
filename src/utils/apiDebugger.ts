/**
 * API Debugger Utility
 * Tests /api/user/products endpoint and logs all response details
 * Helps diagnose JWT vs ObjectId, CORS, response shape, caching issues
 */

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

  try {
    const url = `${baseUrl}/user/products?access_token=${encodeURIComponent(
      accessToken,
    )}`;

    console.log("🔍 DEBUG: Fetching", url);

    const response = await fetch(url, {
      method: "GET",
      credentials: "include", // Send cookies if needed
      headers: {
        Accept: "application/json",
      },
    });

    result.status = response.status;
    result.statusText = response.statusText;

    // Capture all response headers
    const allHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      allHeaders[key] = value;
    });
    result.headers = allHeaders;

    // Extract CORS headers
    result.corsHeaders = {
      allowOrigin: response.headers.get("access-control-allow-origin") || undefined,
      allowCredentials:
        response.headers.get("access-control-allow-credentials") || undefined,
      allowMethods: response.headers.get("access-control-allow-methods") || undefined,
    };

    // Extract cache headers
    result.cacheHeaders = {
      eTag: response.headers.get("etag") || undefined,
      cacheControl: response.headers.get("cache-control") || undefined,
      lastModified: response.headers.get("last-modified") || undefined,
    };

    // Read response body
    result.rawBody = await response.text();

    // Try to parse as JSON
    if (result.rawBody) {
      try {
        result.parsedBody = JSON.parse(result.rawBody);
      } catch (e) {
        console.warn("⚠️ Response is not JSON:", result.rawBody.slice(0, 100));
      }
    }

    result.success = response.ok;

    if (!response.ok) {
      result.error = `HTTP ${response.status}: ${result.statusText}`;
    }

    const duration = performance.now() - startTime;
    result.duration = Math.round(duration);

    return result;
  } catch (e: any) {
    result.error = e?.message || "Unknown error";
    result.duration = Math.round(performance.now() - startTime);
    return result;
  }
}

export function logDebugResult(result: DebugResult): void {
  console.group("🔧 API Debug Result");

  console.log("✅ Success:", result.success);
  console.log("📊 Status:", `${result.status} ${result.statusText}`);
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
  if (result.parsedBody) {
    console.log("Parsed JSON:", result.parsedBody);
  } else {
    console.log("Raw text:", result.rawBody);
  }
  console.groupEnd();

  console.group("🔍 Diagnostic Hints");

  // Check CORS
  if (!result.corsHeaders.allowOrigin) {
    console.warn(
      "⚠️ No Access-Control-Allow-Origin header. Backend CORS may not allow localhost.",
    );
  }

  // Check cache
  if (result.status === 304) {
    console.warn("⚠️ Got 304 Not Modified. Response body may be empty (cached).");
  }

  // Check response shape
  if (result.parsedBody) {
    const hasProducts = Array.isArray(result.parsedBody);
    const hasProductsKey = result.parsedBody?.products;
    const hasDataKey = result.parsedBody?.data;

    if (!hasProducts && !hasProductsKey && !hasDataKey) {
      console.warn(
        "⚠️ Response shape unclear. Expected array, {products: []}, or {data: []}.",
      );
      console.log(
        "   Got keys:",
        Object.keys(result.parsedBody).join(", "),
      );
    }
  }

  console.groupEnd();
  console.groupEnd();
}

/**
 * Example usage in React component:
 *
 * useEffect(() => {
 *   const test = async () => {
 *     const result = await debugUserProductsEndpoint(
 *       "https://beckend-n14-soqt.vercel.app/api",
 *       "68498a885b84cdab155e6388"
 *     );
 *     logDebugResult(result);
 *   };
 *   test();
 * }, []);
 */
