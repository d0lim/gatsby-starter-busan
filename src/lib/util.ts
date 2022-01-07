import { format, isFuture } from "date-fns";
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
