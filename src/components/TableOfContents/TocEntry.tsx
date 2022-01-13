import { OrderedList, ListItem, Text } from "@chakra-ui/react";
import * as React from "react";
import { ContentItemsWithIndex } from ".";

export type TocEntryProps = {
  items?: ContentItemsWithIndex;
  current: number;
};

const TocEntry = ({ items, current }: TocEntryProps) => {
  return (
    <OrderedList listStyleType="none" mt={1} color="#616161">
      {items?.map((item, i) => {
        const handleClick = () => {
          const el = document.querySelector(item.url);
          el?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        };
        if (item.items) {
          return (
            <ListItem key={i} mt={1}>
              {item.index === current ? (
                <Text
                  onClick={handleClick}
                  color="teal.500"
                  cursor="pointer"
                  transition="all 0.125s ease-in 0s"
                  transform="scale(1.05)"
                >
                  {item.title}
                </Text>
              ) : (
                <Text onClick={handleClick} cursor="pointer">
                  {item.title}
                </Text>
              )}
              <TocEntry items={item.items} current={current} />
            </ListItem>
          );
        } else
          return (
            <ListItem key={i} mt={1}>
              {item.index === current ? (
                <Text
                  onClick={handleClick}
                  color="teal.500"
                  cursor="pointer"
                  transition="all 0.125s ease-in 0s"
                  transform="scale(1.05)"
                >
                  {item.title}
                </Text>
              ) : (
                <Text onClick={handleClick} cursor="pointer">
                  {item.title}
                </Text>
              )}
            </ListItem>
          );
      })}
    </OrderedList>
  );
};

export default TocEntry;
