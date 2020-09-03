import React from "react";
import { Box, Flex, Heading, Button } from "@chakra-ui/core";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

import Parks from "../components/parks";

export default function Index() {
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
  console.log("test123");

  const { title } = site.siteMetadata;
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
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
          <Button size="sm">Log In</Button>
        </Flex>
        <Box maxW="containers.md" mx="auto">
          <Parks />
        </Box>
      </>
    </>
  );
}
