import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useReduxDispatch } from "../../../hooks/useRedux/useRedux";
import { logout } from "../../../redux/user-slice";

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const openedRef = useRef(false);

  useEffect(() => {
    if (openedRef.current) return;
    openedRef.current = true;

    Modal.confirm({
      title: "Log out",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to log out?",
      okText: "Yes",
      cancelText: "No",
      centered: true,

      onOk() {
        deleteCookie("user");
        deleteCookie("token");

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("profile_account_details");

        dispatch(logout());

        navigate("/", { replace: true });
      },

      onCancel() {
        navigate("/profile/account", { replace: true });
      },
    });
  }, [navigate, dispatch]);

  return null;
};

export default Logout;
