import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { cloneDeep, debounce } from "lodash";
import * as React from "react";

export type ContentItems = {
  url: string;
  title: string;
  items?: ContentItems;
}[];

type ContentItemsWithIndex = ContentItemWithIndex[];

type ContentItemWithIndex = {
  index: number;
  url: string;
  title: string;
  items?: ContentItemsWithIndex;
};

type TableOfContentsProps = {
  items: ContentItems;
};

type TocEntryProps = {
  items?: ContentItemsWithIndex;
  current: number;
};

const TocEntry = ({ items, current }: TocEntryProps) => {
  return (
    <OrderedList>
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
            <ListItem key={i}>
              {item.index === current ? (
                <Text onClick={handleClick} color="teal.500" cursor="pointer">
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
            <ListItem key={i}>
              {item.index === current ? (
                <Text onClick={handleClick} color="teal.500" cursor="pointer">
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

const accumulateOffsetTop = (el: HTMLElement | null, totalOffset = 0) => {
  while (el) {
    totalOffset += el.offsetTop - el.scrollTop + el.clientTop;
    el = el.offsetParent as HTMLElement;
  }
  return totalOffset;
};

const flattenContentItems = (items: ContentItems) => {
  return items.reduce((acc, item) => {
    acc = acc.concat(item);
    if (item.items) {
      acc = acc.concat(flattenContentItems(item.items));
      item.items = [];
    }
    return acc;
  }, [] as ContentItems);
};

function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  if (!items) return <></>;
  const [headings, setHeadings] = React.useState<{
    titles: string[];
    nodes: HTMLElement[];
  }>({
    titles: [],
    nodes: [],
  });
  const [currentIndex, setCurrentIndex] = React.useState<number>(-1);
  const [itemsWithIndex, setItemsWithIndex] =
    React.useState<ContentItemsWithIndex>();

  let idx = 0;
  const addIndexToItems = (items: ContentItems) => {
    return items.map(item => {
      const itemWithIndex = { ...item, index: idx };
      idx++;
      if (itemWithIndex.items)
        itemWithIndex.items = addIndexToItems(itemWithIndex.items);
      return itemWithIndex;
    }) as ContentItemsWithIndex;
  };

  React.useEffect(() => {
    const scrollHandler = debounce(() => {
      const { titles, nodes } = headings;
      const offsets = nodes.map(el => accumulateOffsetTop(el));
      const activeIndex = offsets.findIndex(
        offset => offset > window.scrollY + 0.1 * window.innerHeight
      );
      setCurrentIndex(activeIndex === -1 ? titles.length - 1 : activeIndex - 1);
    }, 100);
    window.addEventListener(`scroll`, scrollHandler);
    return () => window.removeEventListener(`scroll`, scrollHandler);
  }, [headings]);

  React.useEffect(() => {
    const copiedItems = cloneDeep(items);
    const flatItems = flattenContentItems(copiedItems);
    const ids = flatItems.map(item => item.url);
    const titles = flatItems.map(item => item.title);
    const nodes: HTMLElement[] = ids
      .map(id => document.querySelector(id) as HTMLElement)
      .filter(notEmpty);

    setHeadings({ titles, nodes });
    setItemsWithIndex(addIndexToItems(items));
  }, [items]);

  return (
    <Box
      position="absolute"
      height="100%"
      left="720px"
      width="240px"
      ml="48px"
      padding="8px"
    >
      <Box position="sticky" top="112px">
        <TocEntry items={itemsWithIndex} current={currentIndex} />
      </Box>
    </Box>
  );
};

export default TableOfContents;
