import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  OrderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import AccountDetails from "./profile/sections/AccountDetails";
import {
  MyProducts,
  Address,
  Wishlist,
  TrackOrder,
  Logout,
} from "./profile/sections";

const { Sider, Content } = Layout;

const Profile = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // /profile/account -> account
  const selectedKey = pathname.split("/")[2] || "account";

  return (
    <div className="bg-white">
      <Layout
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "24px 16px",
          background: "transparent",
        }}
      >
        <Sider
          width={280}
          style={{
            background: "#fff",
            borderRight: "1px solid #f0f0f0",
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => navigate(`/profile/${e.key}`)}
            items={[
              {
                key: "account",
                icon: <UserOutlined />,
                label: "Account Details",
              },
              {
                key: "products",
                icon: <ShoppingOutlined />,
                label: "My Products",
              },
              {
                key: "address",
                icon: <EnvironmentOutlined />,
                label: "Address",
              },
              { key: "wishlist", icon: <HeartOutlined />, label: "Wishlist" },
              {
                key: "track-order",
                icon: <OrderedListOutlined />,
                label: "Track Order",
              },
              { type: "divider" as const },
              {
                key: "logout",
                icon: <LogoutOutlined style={{ color: "red" }} />,
                label: <span style={{ color: "red" }}>Log out</span>,
              },
            ]}
            className="profile-menu"
          />
        </Sider>

        <Content style={{ paddingLeft: 32 }}>
          <div style={{ maxWidth: 900 }}>
            {selectedKey === "account" && <AccountDetails />}
            {selectedKey === "products" && <MyProducts />}
            {selectedKey === "address" && <Address />}
            {selectedKey === "wishlist" && <Wishlist />}
            {selectedKey === "track-order" && <TrackOrder />}
            {selectedKey === "logout" && <Logout />}
          </div>
        </Content>
      </Layout>

      <style>{`
        .profile-menu .ant-menu-item {
          height: 52px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 !important;
        }

        .profile-menu .ant-menu-item-selected {
          background: #eaf6ee !important;
          color: #46A358 !important;
          font-weight: 500;
          position: relative;
        }

        .profile-menu .ant-menu-item-selected::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #46A358;
        }

        .profile-menu .ant-menu-item:hover {
          color: #46A358;
        }
      `}</style>
    </div>
  );
};

export default Profile;
