"use client";
import React, { useState } from "react";
import { LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { message, Tabs } from "antd";
import { useRouter } from "next/navigation";

type LoginType = "phone" | "account";

export default function Login() {
  const [loginType, setLoginType] = useState<LoginType>("account");
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    if (loginType === "phone" && values.captcha !== "1234") {
      console.log(values);
      message.success("手机号登录成功！");
      router.push("/");
    } else if (
      loginType === "account" &&
      values.username !== "admin" &&
      values.password !== "admin"
    ) {
      console.log(values);
      message.success("账号密码登录成功！");
      router.push("/");
    } else {
      message.error("登录失败！");
    }
  };

  return (
    <div className="bg-white flex w-full h-screen items-center justify-center">
      <div>
        <LoginForm
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="Github"
          subTitle="全球最大的代码托管平台"
          onFinish={handleSubmit}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={"account"} tab={"账号密码登录"} />
            <Tabs.TabPane key={"phone"} tab={"手机号登录"} />
          </Tabs>
          {loginType === "account" && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined />,
                }}
                placeholder={"用户名: admin"}
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined />,
                }}
                placeholder={"密码: admin"}
                rules={[
                  {
                    required: true,
                    message: "请输入密码！",
                  },
                ]}
              />
            </>
          )}
          {loginType === "phone" && (
            <>
              <ProFormText
                fieldProps={{
                  size: "large",
                  prefix: <MobileOutlined />,
                }}
                name="mobile"
                placeholder={"手机号"}
                rules={[
                  {
                    required: true,
                    message: "请输入手机号！",
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: "手机号格式错误！",
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: "large",
                }}
                placeholder={"请输入验证码"}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${"获取验证码"}`;
                  }
                  return "获取验证码";
                }}
                phoneName="mobile"
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: "请输入验证码！",
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  console.log(phone);
                  message.success("获取验证码成功！验证码为：1234");
                }}
              />
            </>
          )}
          <div className="mb-4">
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a className="float-right">忘记密码</a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
}
