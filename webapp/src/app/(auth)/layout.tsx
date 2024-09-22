"use client";
import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return <div>{children}</div>;
}

export default AuthLayout;
