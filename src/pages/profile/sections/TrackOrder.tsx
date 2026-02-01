import React, { useEffect, useMemo, useState } from "react";
import { Button, message } from "antd";
import Cookies from "js-cookie";

type CookieUser = {
  _id?: string;
  name?: string;
  surname?: string;
};

const TrackOrder: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [serverMsg, setServerMsg] = useState<string>("");

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
  }, []);

  const token = useMemo(() => {
    const raw = Cookies.get("token");
    if (!raw) return "";
    try {
      return raw.includes("%") ? decodeURIComponent(raw) : raw;
    } catch {
      return raw;
    }
  }, []);

  const userId = useMemo(() => (cookieUser?._id || "").trim(), [cookieUser]);

  const extractListAndMessage = (data: any): { list: any[]; msg: string } => {
    // 1) string bo‘lsa
    if (typeof data === "string") {
      return { list: [], msg: data };
    }

    // 2) array bo‘lsa
    if (Array.isArray(data)) {
      return { list: data, msg: data.length ? "" : "No orders yet." };
    }

    // 3) object bo‘lsa
    if (data && typeof data === "object") {
      const possibleMsg =
        data?.extraMessage || data?.message || data?.error || "";

      // order_list ko‘p backendda shu bo‘ladi
      const candidates = [
        data?.orders,
        data?.data,
        data?.order_list,
        data?.orderList,
        data?.list,
        data?.items,
      ];

      for (const c of candidates) {
        if (Array.isArray(c)) {
          return {
            list: c,
            msg: c.length ? "" : possibleMsg || "No orders yet.",
          };
        }
      }

      // object ichidan array qidiramiz
      for (const k of Object.keys(data)) {
        if (Array.isArray(data[k])) {
          return {
            list: data[k],
            msg: data[k].length ? "" : possibleMsg || "No orders yet.",
          };
        }
      }

      // hech qanday list topilmasa
      return { list: [], msg: possibleMsg || "No orders yet." };
    }

    return { list: [], msg: "No orders yet." };
  };

  const fetchOrders = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);
      setServerMsg("");

      if (!BASE_URL) {
        setOrders([]);
        setError("VITE_BASE_URL topilmadi (.env ni tekshiring).");
        return;
      }

      if (!userId) {
        setOrders([]);
        setError("User ID topilmadi (cookie user._id yo‘q). Login qiling.");
        return;
      }

      const url = `${BASE_URL}/order/get-order?access_token=${encodeURIComponent(
        userId,
      )}`;

      const res = await fetch(url, {
        method: "GET",
        signal,
        mode: "cors",
        credentials: "omit", // CORS uchun eng to‘g‘risi
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const rawText = await res.text();
      let data: any = null;

      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch {
        data = rawText;
      }

      // Debug: response nima ekanini ko‘rish uchun
      console.log("📦 get-order:", {
        status: res.status,
        ok: res.ok,
        data,
      });

      if (!res.ok) {
        const msg =
          (typeof data === "object" &&
            (data?.extraMessage || data?.message || data?.error)) ||
          (typeof data === "string" ? data : null) ||
          `API error: ${res.status}`;
        throw new Error(msg);
      }

      const { list, msg } = extractListAndMessage(data);
      setOrders(list);
      setServerMsg(msg);
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      setOrders([]);
      setServerMsg("");
      setError(e?.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchOrders(controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const onReload = async () => {
    message.loading({ content: "Refreshing...", key: "orders" });
    await fetchOrders();
    message.success({ content: "Updated ✅", key: "orders", duration: 0.8 });
  };

  return (
    <div>
      <h2>Track Order</h2>

      <p>
        {loading
          ? "Loading orders..."
          : error
            ? `Error: ${error}`
            : "Success ✅ (No orders yet.)"}
      </p>

      <div
        style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        <Button onClick={onReload} disabled={loading}>
          Reload
        </Button>

        <Button
          onClick={() => {
            console.log("✅ Orders:", orders);
            message.info("Orders console’da chiqdi");
          }}
          disabled={orders.length === 0}
        >
          Log orders
        </Button>
      </div>
    </div>
  );
};

export default TrackOrder;
