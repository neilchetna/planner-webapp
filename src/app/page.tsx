import { currentUser } from "@clerk/nextjs/server";
import { Button, Container, Flex, Section } from "@radix-ui/themes";
import { redirect } from "next/navigation";

export default async function Home() {
  await redirectUser();

  return (
    <Container>
      <Section>
        <Flex align="center" justify="center" gap="2">
          <Button>Sign Up</Button>
          <Button>Sign In</Button>
        </Flex>
      </Section>
    </Container>
  );
}

async function redirectUser() {
  const user = await currentUser();

  // Add more checks like is banned and such
  if (user) {
    redirect("/plans");
  }
}
