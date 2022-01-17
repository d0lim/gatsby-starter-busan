import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "480px",
  md: "768px",
  lg: "960px",
  xl: "1300px",
  "2xl": "1536px",
});

const theme = {
  fonts: {
    heading: `"Nanum Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `"Nanum Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    mono: `"Iosevka", "Nanum Gothic Coding", monospace`,
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#f5f5f5",
      },
      // styles for the `a`
    },
  },
  breakpoints,
};

export default extendTheme(theme);
