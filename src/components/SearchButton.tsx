import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import * as React from "react";
import Search from "./Search";

const SearchButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} background="#f5f5f5">
        <SearchIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Search</ModalHeader> */}
          <ModalBody>
            <Search indices={[{ name: "Pages", title: "Pages" }]} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchButton;
