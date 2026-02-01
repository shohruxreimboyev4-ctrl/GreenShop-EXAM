import React, { useMemo, useState } from "react";
import Cookies from "js-cookie";
import { message } from "antd";

type BillingAddress = {
  country?: string;
  town?: string;
  street_address?: string;
  extra_address?: string;
  state?: string;
  zip?: string;
};

type CookieUser = {
  _id?: string;
  name?: string;
  surname?: string;
  billing_address?: BillingAddress;
};

const Address: React.FC = () => {
  const initialUser = useMemo(() => {
    const raw = Cookies.get("user");
    if (!raw) return null;

    try {
      const maybeDecoded = raw.includes("%") ? decodeURIComponent(raw) : raw;
      const parsed = JSON.parse(maybeDecoded) as CookieUser;

      if (!parsed || typeof parsed !== "object") return null;
      return parsed;
    } catch {
      return null;
    }
  }, []);

  const [user, setUser] = useState<CookieUser | null>(initialUser);

  const handleSaveAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      message.error("User topilmadi. Iltimos login qiling.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const getStr = (key: string) => String(formData.get(key) ?? "").trim();

    const newAddress: BillingAddress = {
      country: getStr("country"),
      town: getStr("town"),
      street_address: getStr("street"),
      extra_address: getStr("extra_address"),
      state: getStr("state"),
      zip: getStr("zip"),
    };

    const updatedUser: CookieUser = {
      ...(user || {}),
      billing_address: {
        ...(user?.billing_address || {}),
        ...newAddress,
      },
    };

    try {
      Cookies.set("user", JSON.stringify(updatedUser), {
        sameSite: "lax",
        secure: window.location.protocol === "https:",
      });

      setUser(updatedUser);
      message.success("Address saved successfully!");
    } catch {
      message.error("Cookie saqlashda xatolik bo‘ldi.");
    }
  };

  return (
    <div>
      <h2 className="text-[18px] font-bold text-[#3D3D3D] mb-8">
        Billing Address
      </h2>

      {!user ? (
        <div className="border border-[#EAEAEA] rounded p-4 text-[#3D3D3D]">
          <p className="mb-2 font-semibold">User topilmadi</p>
          <p className="text-sm text-[#666]">
            Login qiling — cookie ichida <code>user</code> bo‘lishi kerak.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSaveAddress}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Country / Region <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="country"
                type="text"
                defaultValue={user?.billing_address?.country || ""}
                placeholder="Select your country / region..."
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Town / City <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="town"
                type="text"
                defaultValue={user?.billing_address?.town || ""}
                placeholder="Type your town / city..."
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="street"
                type="text"
                defaultValue={user?.billing_address?.street_address || ""}
                placeholder="Type your street address..."
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Extra address
              </label>
              <input
                name="extra_address"
                type="text"
                defaultValue={user?.billing_address?.extra_address || ""}
                placeholder="Type your extra address..."
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                State <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="state"
                type="text"
                defaultValue={user?.billing_address?.state || ""}
                placeholder="Type your state..."
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#3D3D3D]">
                Zip <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="zip"
                type="text"
                defaultValue={user?.billing_address?.zip || ""}
                placeholder="Type your zip..."
                className="border border-[#EAEAEA] rounded p-2 focus:outline-[#46A358] text-[#3D3D3D]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#46A358] text-white font-bold py-3 px-8 rounded mt-4 hover:bg-[#357c44] transition-all cursor-pointer w-full md:w-auto"
          >
            Save changes
          </button>
        </form>
      )}
    </div>
  );
};

export default Address;
