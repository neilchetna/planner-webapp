import { useClerk } from "@clerk/nextjs";
import { Avatar, Box, Button, Flex, Text } from "@radix-ui/themes";
import { IconLogout } from "@tabler/icons-react";

export default function UserSection() {
  const { signOut } = useClerk();
  return (
    <Flex align="center" justify="between">
      <Flex gap="3" align="center">
        <Avatar radius="full" color="grass" size="3" src="#" fallback="U" />
        <Box as="div">
          <Text className="text-slate-800" as="p" size="2">
            User's Name
          </Text>
          <Text truncate className="text-slate-600" as="p" size="1">
            user@example.com
          </Text>
        </Box>
      </Flex>
      <Button
        className="m-0 aspect-square p-1.5"
        color="gray"
        size="3"
        variant="ghost"
        aria-label="Plans menu"
        onClick={() => signOut({ redirectUrl: "/sign-in" })}
      >
        <IconLogout size={18} />
      </Button>
    </Flex>
  );
}
