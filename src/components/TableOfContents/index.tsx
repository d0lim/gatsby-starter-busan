import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { cloneDeep, debounce } from "lodash";
import * as React from "react";
import {
  accumulateOffsetTop,
  flattenContentItems,
  notEmpty,
} from "../../lib/util";
import TocEntry from "./TocEntry";

export type ContentItems = {
  url: string;
  title: string;
  items?: ContentItems;
}[];

export type ContentItemsWithIndex = ContentItemWithIndex[];

export type ContentItemWithIndex = {
  index: number;
  url: string;
  title: string;
  items?: ContentItemsWithIndex;
};

export type TableOfContentsProps = {
  items: ContentItems;
};

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
      display={{ base: "none", xl: "block" }}
    >
      <Box
        position="sticky"
        top="112px"
        borderLeft="2px solid rgb(233, 236, 239)"
      >
        <TocEntry items={itemsWithIndex} current={currentIndex} />
      </Box>
    </Box>
  );
};

export default TableOfContents;
