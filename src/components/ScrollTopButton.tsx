import { Button, useMediaQuery } from "@chakra-ui/react";
import { throttle } from "lodash";
import * as React from "react";

const ScrollTopButton = () => {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScroll(0);
  };
  const [scroll, setScroll] = React.useState<number>(0);

  React.useEffect(() => {
    const scrollHandler = throttle(() => {
      setScroll(window.scrollY);
    }, 200);
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  });

  const [isDesktop] = useMediaQuery("(min-width: 1300px)");

  return (
    <>
      {scroll >= 300 ? (
        <Button
          position="fixed"
          bottom="40px"
          right="40px"
          onClick={handleTop}
          background="#e4e4e4"
        >
          {isDesktop ? <>Top ᐱ</> : <>ᐱ</>}
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default ScrollTopButton;
