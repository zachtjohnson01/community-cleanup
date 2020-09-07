import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Flex, Heading, Text, TagLabel, Tag } from "@chakra-ui/core";

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      name
      location
      attendees {
        user {
          id
          name
          email
        }
        type {
          id
          name
        }
      }
    }
  }
`;

export default function Events() {
  const { data, loading, error } = useQuery(GET_EVENTS);
  console.log(data);

  if (loading) return <div> Loading events... </div>;
  if (error) {
    return (
      <>
        <div>Events query broken...</div>
        <p>{error.message}</p>
      </>
    );
  }
  return (
    <>
      {data.events.map((event) => (
        <Box key={event.id} p="4">
          <Flex>
            <Box ml="4">
              <Heading mr="4">{event.name}</Heading>
              {event.location && <Text>{event.location}</Text>}
              {event.attendees.map((attendee) => (
                <Tag
                  key={attendee.user.id}
                  rounded="full"
                  variant="solid"
                  variantColor="purple"
                  my="1"
                >
                  <TagLabel>{attendee.user.name}</TagLabel>
                </Tag>
              ))}
            </Box>
          </Flex>
        </Box>
      ))}
    </>
  );
}
