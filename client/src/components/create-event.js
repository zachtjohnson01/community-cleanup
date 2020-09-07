import React, { useState } from "react";
import { gql } from "@apollo/client";
import {
  ModalCloseButton,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  Button,
  ModalBody,
  Input,
  Stack,
  ModalFooter,
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

export default function CreateEvent() {
  const [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    setModalOpen(false);
  }

  function openModal() {
    setModalOpen(true);
  }

  return (
    <>
      <Button onClick={openModal} variantColor="purple" size="sm" mt="4">
        Create Event
      </Button>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Event</ModalHeader>
          <ModalCloseButton />
          <EventForm
            buttonText="Create Event"
            onCancel={closeModal}
            mutation={CREATE_EVENT}
            mutationOptions={{
              onCompleted: closeModal,
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
      </Modal>
    </>
  );
}
