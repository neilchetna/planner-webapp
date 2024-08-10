"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .email("This email is invalid")
    .min(1, { message: "You must enter an Email to continue" }),
  password: z.string().min(8, { message: "Password must contain 8 letters" }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

type LoginFormPropsType = {
  loginFormSubmit: (data: LoginFormType) => void;
};

function LoginForm({ loginFormSubmit }: LoginFormPropsType) {
  const { register, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(loginFormSubmit)}>
      <Flex className="mt-3" direction="column" gap="2">
        <Box>
          <Text as="p">Email</Text>
          <TextField.Root
            placeholder="name@example.com"
            type="email"
            {...register("email")}
          />
        </Box>
        <Box>
          <Text as="p">Password</Text>
          <TextField.Root type="password" {...register("password")} />
        </Box>
        <Button type="submit" style={{ width: "fit-content" }} mt="4">
          Sing In
        </Button>
      </Flex>
    </form>
  );
}

export default LoginForm;
