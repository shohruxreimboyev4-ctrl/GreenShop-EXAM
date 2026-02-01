import React, { useEffect, useMemo, useState } from "react";
import { Card, Empty, Skeleton, Typography, Button, message } from "antd";
import Cookies from "js-cookie";

const { Title, Text } = Typography;

type CookieUser = {
  _id?: string;
  name?: string;
  surname?: string;
};

type ApiProduct = {
  _id: string;
  title?: string;
  price?: number;
  main_image?: string;
  category?: string;
  createdAt?: string;
};

const MyProducts: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  // ✅ cookie o‘zgarganda qayta o‘qish uchun
  const [cookieVersion, setCookieVersion] = useState(0);

  const BASE_URL_RAW = import.meta.env.VITE_BASE_URL as string;
  const BASE_URL = useMemo(
    () => (BASE_URL_RAW || "").replace(/\/+$/, ""),
    [BASE_URL_RAW],
  );

  const cookieUser = useMemo(() => {
    const raw = Cookies.get("user");
    if (!raw) return null;

    try {
      const maybeDecoded = raw.includes("%") ? decodeURIComponent(raw) : raw;
      return JSON.parse(maybeDecoded) as CookieUser;
    } catch {
      return null;
    }
  }, [cookieVersion]);

  const fullName = useMemo(() => {
    if (!cookieUser) return "";
    return `${cookieUser?.name || ""} ${cookieUser?.surname || ""}`.trim();
  }, [cookieUser]);

  const userId = useMemo(() => {
    return (cookieUser?._id || "").trim();
  }, [cookieUser]);

  // ✅ ba’zi backendlar access_token sifatida token kutadi
  const token = useMemo(() => {
    const raw = Cookies.get("token");
    if (!raw) return "";
    try {
      return raw.includes("%") ? decodeURIComponent(raw) : raw;
    } catch {
      return raw;
    }
  }, [cookieVersion]);

  const fetchProducts = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);

      if (!BASE_URL) {
        setProducts([]);
        setError("VITE_BASE_URL topilmadi (.env ni tekshiring).");
        return;
      }

      // ✅ 1-urinish: userId bor bo‘lsa shuni ishlatamiz
      // ✅ 2-urinish: userId bo‘lmasa token bo‘lsa shuni ishlatamiz
      const accessToken = userId || token;

      if (!accessToken) {
        setProducts([]);
        setError("User ID yoki token topilmadi (login qiling).");
        return;
      }

      const url = `${BASE_URL}/user/products?access_token=${encodeURIComponent(
        accessToken,
      )}`;

      const res = await fetch(url, {
        method: "GET",
        signal,
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      const rawText = await res.text();

      let data: any = null;
      if (rawText) {
        try {
          data = JSON.parse(rawText);
        } catch {
          data = rawText;
        }
      }

      if (!res.ok) {
        console.log("❌ MyProducts error:", {
          status: res.status,
          url,
          response: data,
          usedAccessToken: userId ? "userId" : token ? "token" : "none",
        });

        const msg =
          (typeof data === "object" &&
            (data?.extraMessage || data?.message || data?.error)) ||
          (typeof data === "string" ? data : null) ||
          `API error: ${res.status}`;

        throw new Error(msg);
      }

      const list: ApiProduct[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.products)
          ? data.products
          : Array.isArray(data?.data)
            ? data.data
            : [];

      setProducts(list);
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      setProducts([]);
      setError(e?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => controller.abort();
  }, [userId, token]);

  const onReload = async () => {
    // ✅ reload bosilganda cookieni ham qayta o‘qiymiz
    setCookieVersion((v) => v + 1);

    message.loading({ content: "Refreshing...", key: "myprod" });
    try {
      await fetchProducts();
      message.success({ content: "Updated ✅", key: "myprod", duration: 0.8 });
    } catch {
      message.error({ content: "Refresh failed", key: "myprod", duration: 1 });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Title level={4} style={{ marginBottom: 2 }}>
          My Products
        </Title>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Text type="secondary">
            {fullName ? (
              <>
                Owner: <b>{fullName}</b>
              </>
            ) : (
              "Owner: —"
            )}
          </Text>

          <Button onClick={onReload}>Reload</Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <Skeleton active />
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card>
          <Text type="danger">{error}</Text>
          <div style={{ marginTop: 10 }}>
            <Button onClick={onReload}>Try again</Button>
          </div>
        </Card>
      ) : products.length === 0 ? (
        <Card>
          <Empty
            description="No products yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <Card
              key={p._id}
              hoverable
              cover={
                <div className="h-[180px] bg-[#f5f5f5] flex items-center justify-center overflow-hidden">
                  {p.main_image ? (
                    <img
                      src={p.main_image}
                      alt={p.title || "product"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No image</span>
                  )}
                </div>
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Text strong className="block truncate">
                    {p.title || "Untitled"}
                  </Text>
                  <Text type="secondary" className="text-xs">
                    {p.category || "—"}
                  </Text>
                </div>

                <Text strong style={{ color: "#46A358" }}>
                  ${Number(p.price || 0).toFixed(2)}
                </Text>
              </div>

              {p.createdAt && (
                <Text type="secondary" className="text-xs block mt-2">
                  Created: {String(p.createdAt).slice(0, 10)}
                </Text>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
