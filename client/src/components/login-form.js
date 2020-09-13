import React, { useState } from "react";
import { useApolloClient, gql, useMutation } from "@apollo/client";
import { Flex, Stack, Heading, Text, Input, Button } from "@chakra-ui/core";

export const LOGIN_USER = gql`
  mutation Login($authInput: String!) {
    login(authInput: $authInput) {
      token
    }
  }
`;

export default function LoginForm() {
  const client = useApolloClient();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const [login, { loading, error, data }] = useMutation(LOGIN_USER, {
    errorPolicy: "all",
    onCompleted: (data) => {
      if (data.login) {
        localStorage.setItem("communitycleanup:token", data.login?.token);
        client.resetStore();
      }
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const { email, password } = event.target;

    const authInput = btoa(`${email.value}:${password.value}`);
    await login({
      variables: {
        authInput: authInput,
      },
    });
  }
  return (
    <>
      <Flex h="100vh" align="center" justify="center" bg="white">
        <Stack
          p="8"
          rounded="lg"
          shadow="33px 33px 86px #e6e6e6, -33px -33px 86px #ffffff"
          maxW="320px"
          w="full"
          as="form"
          spacing="4"
          bg="white"
          onSubmit={handleSubmit}
        >
          <Heading textAlign="center" fontSize="x1" pb="2">
            Community Cleanup
          </Heading>
          {error && <Text color="red.500">{error.message}</Text>}
          <Input placeholder="Email" type="email" name="email" />
          <Input placeholder="Password" type="password" name="password" />
          <Button mt="2" ml="auto" isLoading={loading} type="submit">
            Log in
          </Button>
        </Stack>
      </Flex>
    </>
  );
}
