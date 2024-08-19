"use client";
import { SignUp } from "@clerk/nextjs";
import { Container } from "@radix-ui/themes";

export default function SignUpPage() {
  return (
    <Container p="7" size="1">
      <SignUp />
    </Container>
  );
}
