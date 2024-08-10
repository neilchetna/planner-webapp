"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignUpFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "You must enter an Email to continue" }),
  password: z.string().min(8, { message: "Password must contain 8 letters" }),
});

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;

type SignUpFormPropsType = {
  signUpFormSubmit: (data: SignUpFormType) => void;
};

function SignUpForm({ signUpFormSubmit }: SignUpFormPropsType) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormType>({
    mode: "onSubmit",
    resolver: zodResolver(SignUpFormSchema),
  });

  console.log({ errors, isValid });

  return (
    <Form.Root onSubmit={handleSubmit(signUpFormSubmit)}>
      isDirty: {JSON.stringify(isValid)}
      <Form.Field name="email">
        <Form.Label>Email</Form.Label>
        {errors.email?.message && (
          <Form.Message>{errors.email?.message}</Form.Message>
        )}
        <Form.Control asChild>
          <TextField.Root
            placeholder="name@example.com"
            type="email"
            {...register("email")}
          />
        </Form.Control>
      </Form.Field>
      <Flex className="mt-3" direction="column" gap="2">
        <Box>
          <Text as="p">Password</Text>
          <TextField.Root type="password" {...register("password")} />
        </Box>
        <Button type="submit" style={{ width: "fit-content" }} mt="4">
          Sing In
        </Button>
      </Flex>
    </Form.Root>
  );
}

export default SignUpForm;
