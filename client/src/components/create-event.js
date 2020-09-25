import React, { useState } from "react";
import { gql } from "@apollo/client";
import {
  ModalCloseButton,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
} from "@chakra-ui/core";

import EventForm from "./event-form";
import { GET_EVENTS } from "./events";

export const CREATE_EVENT = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      success
      message
      event {
        id
        name
        location
      }
    }
  }
`;

export default function CreateEvent(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="purple" size="sm" mt="4">
        Create Event
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Create Event</ModalHeader>
            <ModalCloseButton />
            <EventForm
              buttonText="Create Event"
              onCancel={onClose}
              mutation={CREATE_EVENT}
              mutationOptions={{
                onCompleted: onClose,
                update: (cache, { data }) => {
                  const { events } = cache.readQuery({ query: GET_EVENTS });
                  cache.writeQuery({
                    query: GET_EVENTS,
                    data: {
                      events: [data.createEvent, ...events],
                    },
                  });
                },
              }}
            />
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
