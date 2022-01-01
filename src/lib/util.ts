import { isFuture } from "date-fns";
import { PostEdge, PostEdges, PostNode } from "../pages/index";

export function mapEdgesToNodes(data: PostEdges) {
  if (!data.edges) return [];
  return data.edges.map((edge: PostEdge) => edge.node);
}

export function filterNoSlugs({ slug }: PostNode) {
  return (slug || {}).current;
}

export function filterPublishedInTheFuture({ publishedAt }: PostNode) {
  return !isFuture(new Date(publishedAt));
}
