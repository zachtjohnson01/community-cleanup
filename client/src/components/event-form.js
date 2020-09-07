import React from "react";
import { useMutation } from "@apollo/client";
import {
  Input,
  Button,
  Stack,
  Text,
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
      id: props.event?.id,
      name: name.value,
      location: location.value,
    };

    mutate({ variables: { input } });
  };
  return (
    <form onSubmit={handleSubmit}>
      <ModalBody as={Stack}>
        {error && <Text color="red.500">{error.message}</Text>}
        <Input
          isRequired
          defaultValue={props.event?.name}
          type="text"
          name="name"
          placeholder="Event name"
        />
        <Input
          defaultValue={props.event?.location}
          type="text"
          name="location"
          placeholder="Event location"
        />
      </ModalBody>
      <ModalFooter>
        <Button mr="2" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button variantColor="purple" isLoading={loading} type="submit">
          {props.buttonText}
        </Button>
      </ModalFooter>
    </form>
  );
}
