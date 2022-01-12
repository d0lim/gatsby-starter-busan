import { Box, ListItem, OrderedList } from "@chakra-ui/react";
import { cloneDeep, throttle } from "lodash";
import * as React from "react";

export type ContentItems = {
  url: string;
  title: string;
  items?: ContentItems;
}[];

type TableOfContentsProps = {
  items: ContentItems;
};

const TocEntry = ({ items }: { items: ContentItems }) => {
  return (
    <OrderedList>
      {items.map((item, index) => {
        if (item.items)
          return (
            <ListItem key={index}>
              {item.title || "Item Title"}
              <TocEntry items={item.items} />
            </ListItem>
          );
        else
          return <ListItem key={index}>{item.title || "Item Title"}</ListItem>;
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

  React.useEffect(() => {
    const scrollHandler = throttle(() => {
      const { titles, nodes } = headings;
      const offsets = nodes.map(el => accumulateOffsetTop(el));
      const activeIndex = offsets.findIndex(
        offset => offset > window.scrollY + 0.02 * window.innerHeight
      );
      console.log(
        activeIndex === -1 ? titles[titles.length - 1] : titles[activeIndex - 1]
      );
    }, 200);
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
  }, [items]);

  return (
    <Box position="absolute" left="100%">
      <TocEntry items={items} />
    </Box>
  );
};

export default TableOfContents;
