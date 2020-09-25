import React, { useState } from "react";
import { useApolloClient, gql, useMutation } from "@apollo/client";
import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/core";
import { GET_EVENTS } from "./events";

export const LOGIN_USER = gql`
  mutation Login($authInput: String!) {
    login(authInput: $authInput) {
      token
    }
  }
`;

export default function LoginForm(props) {
  const client = useApolloClient();

  const [login, { loading, error, data }] = useMutation(LOGIN_USER, {
    refetchQueries: [{ query: GET_EVENTS }],
    errorPolicy: "all",
    onCompleted: (data) => {
      if (data.login) {
        localStorage.setItem("communitycleanup:token", data.login?.token);
        props.onFinish();
        console.log(client.cache.data.data);
      }
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const { email, password } = event.target;

    const authInput = btoa(`${email.value}:${password.value}`);
    console.log(client.cache.data.data);
    client.resetStore();
    await login({
      variables: {
        authInput: authInput,
      },
    });
  }
  return (
    <>
      {/* <Flex
        // h="100vh"
        align="center"
        justify="center"
        bg="white"
      > */}
      {/* <Stack
        p="8"
        rounded="lg"
        // shadow="33px 33px 86px #e6e6e6, -33px -33px 86px #ffffff"
        // maxW="320px"
        w="full"
        as="form"
        spacing="4"
        // bg="white"
        onSubmit={handleSubmit}
      > */}
      <form onSubmit={handleSubmit}>
        <ModalBody as={Stack}>
          <Heading textAlign="center" fontSize="x1" pb="2">
            Log In
          </Heading>
          {error && <Text color="red.500">{error.message}</Text>}
          <Input placeholder="Email" type="email" name="email" />
          <Input placeholder="Password" type="password" name="password" />
        </ModalBody>
        <ModalFooter>
          <Button mt="2" ml="auto" isLoading={loading} type="submit">
            Log in
          </Button>
        </ModalFooter>
      </form>

      {/* </Stack> */}
      {/* </Flex> */}
    </>
  );
}
