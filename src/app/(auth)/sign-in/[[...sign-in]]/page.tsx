"use client";
import { SignIn } from "@clerk/nextjs";
import { Container } from "@radix-ui/themes";

export default function LoginPage() {
  return (
    <Container p="7" size="1">
      <SignIn />
    </Container>
  );
}
