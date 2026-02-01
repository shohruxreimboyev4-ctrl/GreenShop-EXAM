import React, { useEffect } from "react";
import {
  Space,
  Form,
  Input,
  Row,
  Col,
  Button,
  Upload,
  Select,
  message,
} from "antd";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";

type CookieUser = {
  name?: string;
  surname?: string;
  email?: string;
  phone_number?: string;
  username?: string;
  profile_photo?: string;
};

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phonePrefix: string;
  phone: string;
  username: string;
  image?: UploadFile[];
};

const STORAGE_KEY = "profile_account_details";

const AccountDetails = () => {
  const [form] = Form.useForm<ProfileFormValues>();

  const normFile = (e: UploadChangeParam) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const getCookie = (name: string) => {
    try {
      const value = `; ${document.cookie || ""}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length !== 2) return null;

      const raw = parts.pop()!.split(";").shift() || "";
      return raw || null;
    } catch {
      return null;
    }
  };

  const setCookie = (name: string, value: string, days = 365) => {
    try {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(
        value,
      )}; path=/; expires=${expires}; SameSite=Lax`;
    } catch {
      message.error("Could not save to cookie");
    }
  };

  const getUserFromCookie = (): CookieUser | null => {
    const raw = getCookie("user");
    if (!raw) return null;

    try {
      const decoded = raw.includes("%") ? decodeURIComponent(raw) : raw;
      return JSON.parse(decoded) as CookieUser;
    } catch {
      return null;
    }
  };

  const readStorage = (): Partial<ProfileFormValues> | null => {
    const raw = getCookie(STORAGE_KEY);
    if (!raw) return null;

    try {
      const decoded = raw.includes("%") ? decodeURIComponent(raw) : raw;
      const parsed = JSON.parse(decoded) as Partial<ProfileFormValues>;
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  };

  const writeStorage = (values: ProfileFormValues) => {
    try {
      setCookie(STORAGE_KEY, JSON.stringify(values), 365);
    } catch {
      message.error("Could not save to cookie");
    }
  };

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("FileReader failed"));
      reader.readAsDataURL(file);
    });

  useEffect(() => {
    const saved = readStorage();
    if (saved) {
      form.setFieldsValue({
        phonePrefix: "+998",
        ...saved,
      });
      return;
    }

    const user = getUserFromCookie();
    if (!user) return;

    form.setFieldsValue({
      firstName: user.name || "",
      lastName: user.surname || "",
      email: user.email || "",
      phonePrefix: "+998",
      phone: user.phone_number || "",
      username: user.username || "",
    });

    if (user.profile_photo) {
      form.setFieldsValue({
        image: [
          {
            uid: "-1",
            name: "profile.jpg",
            status: "done",
            url: user.profile_photo,
          } as UploadFile,
        ],
      });
    }
  }, [form]);

  const onFinish = async (values: ProfileFormValues) => {
    const file = values.image?.[0];

    let imageList = values.image;

    if (file?.originFileObj) {
      try {
        const base64 = await fileToBase64(file.originFileObj as File);

        imageList = [
          {
            uid: file.uid,
            name: file.name,
            status: "done",
            url: base64,
          } as UploadFile,
        ];
      } catch {
        message.error("Image save failed");
        return;
      }
    }

    const payload: ProfileFormValues = {
      ...values,
      image: imageList,
    };

    writeStorage(payload);
    message.success("Saved to cookie ✅");
    console.log("Saved profile:", payload);
  };

  return (
    <Form<ProfileFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ phonePrefix: "+998" }}
    >
      <Row gutter={[24, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            label="First name"
            name="firstName"
            rules={[{ required: true, message: "First name required" }]}
          >
            <Input size="large" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[{ required: true, message: "Last name required" }]}
          >
            <Input size="large" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email required" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label="Phone number" required style={{ marginBottom: 0 }}>
            <Space.Compact style={{ width: "100%" }}>
              <Form.Item name="phonePrefix" noStyle>
                <Select
                  size="large"
                  style={{ width: 90 }}
                  options={[
                    { value: "+998", label: "+998" },
                    { value: "+7", label: "+7" },
                    { value: "+1", label: "+1" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                noStyle
                rules={[{ required: true, message: "Phone required" }]}
              >
                <Input size="large" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username required" }]}
          >
            <Input size="large" placeholder="Enter your username ..." />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Image required" }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload beforeUpload={() => false} maxCount={1} listType="picture">
              <Button size="large" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <div style={{ marginTop: 24 }}>
        <Button
          htmlType="submit"
          size="large"
          style={{
            background: "#46A358",
            borderColor: "#46A358",
            color: "#fff",
            width: "70%",
            minWidth: 300,
            height: 48,
            borderRadius: 8,
            display: "block",
            margin: "0 auto",
          }}
        >
          Save changes
        </Button>
      </div>
    </Form>
  );
};

export default AccountDetails;
