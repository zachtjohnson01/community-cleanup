import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Flex, Heading, Button } from "@chakra-ui/core";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

import Parks from "../components/parks";
import Events from "../components/events";
import CreateEvent from "../components/create-event";
import LoginForm from "../components/login-form";

const LOGGED_IN_QUERY = gql`
  {
    isLoggedIn @client
  }
`;

export default function Index() {
  const { data, client } = useQuery(LOGGED_IN_QUERY);
  const { site } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  const { title } = site.siteMetadata;
  const isLoggedIn = data?.isLoggedIn;
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isLoggedIn ? (
        <>
          <Flex
            as="header"
            justify="space-between"
            align="center"
            px="4"
            bg="gray.100"
            h="12"
          >
            <Flex align="center">
              <Heading fontSize="ls" mr={4}>
                {title}
              </Heading>
            </Flex>
            <Button
              size="sm"
              onClick={() => {
                localStorage.removeItem("communitycleanup:token");
                client.resetStore();
              }}
            >
              Log Out
            </Button>
          </Flex>
          <Box maxW="containers.md" mx="auto">
            <Flex align="left" direction="column">
              <CreateEvent />
              <Events />
            </Flex>
          </Box>
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
}
