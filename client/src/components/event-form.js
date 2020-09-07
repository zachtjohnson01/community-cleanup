import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Input,
  Button,
  Stack,
  Text,
  Textarea,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/core";
import { AnimatePresence, motion } from "framer-motion";

export default function EventForm(props) {
  const [mutate, { loading, error }] = useMutation(
    props.mutation,
    props.mutationOptions
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, location } = event.target;
    const input = {
      name: name.value,
      location: location.value,
    };

    mutate({ variables: { input } });
  };
  return (
    <form onSubmit={handleSubmit}>
      <ModalBody as={Stack}>
        <Input
          isRequired
          defaultValue={props.events?.name}
          type="text"
          name="name"
          placeholder="Event name"
        />
        <Input type="text" name="location" placeholder="Event location" />
      </ModalBody>
      <ModalFooter>
        <Button mr="2" onClick={PaymentResponse.onCancel}>
          Cancel
        </Button>
        <Button variantColor="purple" isLoading={loading} type="submit">
          {props.buttonText}
        </Button>
      </ModalFooter>
    </form>
  );
}
