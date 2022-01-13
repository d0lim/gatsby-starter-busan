import { format, isFuture } from "date-fns";
import { ContentItems } from "../components/TableOfContents";
import { PostEdge, PostEdges, PostNode } from "../pages/index";

export function mapEdgesToNodes(data: PostEdges) {
  if (!data.edges) return [];
  return data.edges.map((edge: PostEdge) => edge.node);
}

export function filterNoSlugs({ slug }: PostNode) {
  return slug || {};
}

export function filterPublishedInTheFuture({
  frontmatter: { publishedAt },
}: PostNode) {
  return !isFuture(new Date(publishedAt));
}

export function getPostUrl(publishedAt: string, slug: string) {
  return `/blog/${format(new Date(publishedAt), "yyyy/MM")}/${slug}`;
}

export function getTagUrl(slug: string) {
  return `/blog/tags/${slug}`;
}

export function getSeriesUrl(slug: string) {
  return `/blog/series/${slug}`;
}

export const accumulateOffsetTop = (
  el: HTMLElement | null,
  totalOffset = 0
) => {
  while (el) {
    totalOffset += el.offsetTop - el.scrollTop + el.clientTop;
    el = el.offsetParent as HTMLElement;
  }
  return totalOffset;
};

export const flattenContentItems = (items: ContentItems) => {
  return items.reduce((acc, item) => {
    acc = acc.concat(item);
    if (item.items) {
      acc = acc.concat(flattenContentItems(item.items));
      item.items = [];
    }
    return acc;
  }, [] as ContentItems);
};

export function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
