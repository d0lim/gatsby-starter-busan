import { extendTheme } from "@chakra-ui/react";
const theme = {
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#f5f5f5",
      },
      // styles for the `a`
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
};

export default extendTheme(theme);
