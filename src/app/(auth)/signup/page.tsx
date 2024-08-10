"use client";
import { Box, Container, Heading } from "@radix-ui/themes";
import { useState } from "react";
import SignUpForm, { SignUpFormType } from "./components/signup-form";

export default function SignUpPage() {
  const [signUpForm, setSignUpForm] = useState<SignUpFormType>();

  function onSignUpFormSubmit(data: SignUpFormType) {
    setSignUpForm(data);
  }

  return (
    <Container p="7" size="1">
      <Box p="4" className="bg-slate-100 rounded-md">
        <Heading>Create an account</Heading>
        <SignUpForm signUpFormSubmit={onSignUpFormSubmit} />
      </Box>
      {JSON.stringify(signUpForm)}
    </Container>
  );
}
