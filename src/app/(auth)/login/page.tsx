"use client";
import { Box, Container, Heading } from "@radix-ui/themes";
import LoginForm, { LoginFormType } from "./components/login-form";
import { useState } from "react";

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState<LoginFormType>();

  function onLoginFormSubmit(data: LoginFormType) {
    setLoginForm(data);
  }

  return (
    <Container p="7" size="1">
      <Box p="4" className="bg-slate-100 rounded-md">
        <Heading>Sign in</Heading>
        <LoginForm loginFormSubmit={onLoginFormSubmit} />
      </Box>
      {JSON.stringify(loginForm)}
    </Container>
  );
}
