import { Button, Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "gatsby";
import * as React from "react";

const HamburgerMenuButton = () => {
  return (
    <Menu isLazy direction="rtl" autoSelect={false}>
      <MenuButton
        as={Button}
        background="#f5f5f5"
        display={{ base: "inline-flex", sm: "inline-flex", md: "none" }}
      >
        <HamburgerIcon />
      </MenuButton>
      <MenuList minWidth="none">
        <MenuItem as={Link} to="/blog/tags">
          Tags
        </MenuItem>
        <MenuItem as={Link} to="/blog/series">
          Series
        </MenuItem>
        <MenuItem as={Link} to="/blog/archive">
          Archive
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenuButton;
