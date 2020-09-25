import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Flex, Heading, Text, TagLabel, Tag } from "@chakra-ui/core";
import { AnimatePresence } from "framer-motion";
import EventMenu from "./event.menu";

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

export default function Events(props) {
  const { data, loading, error } = useQuery(GET_EVENTS);
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
      <AnimatePresence initial={true}>
        {data.events
          .map((event) => (
            <Box key={event.id} p="4">
              <Flex>
                {props.isLoggedIn && <EventMenu event={event} />}
                <Box ml="4">
                  <Heading mr="4">{event.name}</Heading>
                  Id: {event.id}
                  {event.location && <Text>{event.location}</Text>}
                  {event.attendees.map((attendee) => (
                    <Tag
                      key={attendee.user.id}
                      rounded="full"
                      variant="solid"
                      colorScheme="purple"
                      my="1"
                    >
                      <TagLabel>{attendee.user.name}</TagLabel>
                    </Tag>
                  ))}
                </Box>
              </Flex>
            </Box>
          ))
          .sort((a, b) => b.key - a.key)}
      </AnimatePresence>
    </>
  );
}
