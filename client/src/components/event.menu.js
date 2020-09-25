import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  useDisclosure,
  Button,
} from "@chakra-ui/core";
import EventForm from "./event-form";
import { BsChevronDown } from "react-icons/bs";

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($input: UpdateEventInput!) {
    updateEvent(input: $input) {
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

export default function EventMenu(props) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Menu>
        <MenuButton as={Button}>
          <BsChevronDown />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>Update Event</MenuItem>
          {/* <DeleteButton id={props.listing.id} /> */}
        </MenuList>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Update Event</ModalHeader>
            <ModalCloseButton />
            <EventForm
              onCancel={onClose}
              event={props.event}
              buttonText="Update Event"
              mutation={UPDATE_EVENT}
              mutationOptions={{
                onCompleted(data) {
                  onClose();
                  toast({
                    title: "Event updated.",
                    description: `${data.updateEvent.event.name} has been updated`,
                    status: "success",
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
