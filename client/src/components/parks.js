import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Flex, Heading, Text } from "@chakra-ui/core";

const GET_PARKS = gql`
  query GetParks {
    parks {
      id
      name
      location
      zip
    }
  }
`;

export default function Parks() {
  const { data, loading, error } = useQuery(GET_PARKS);

  if (loading) return <div> Loading parks... </div>;
  if (error) {
    return (
      <>
        <div>Parks query broken...</div>
        <p>{error.message}</p>
      </>
    );
  }
  return (
    <>
      {data.parks.map((park) => (
        <Box key={park.id} p="4">
          <Flex>
            <Box ml="4">
              <Heading mr="4">{park.name}</Heading>
              {park.location && <Text>{park.location}</Text>}
            </Box>
          </Flex>
        </Box>
      ))}
    </>
  );
}
