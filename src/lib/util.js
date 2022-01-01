import { isFuture } from "date-fns";

export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map(edge => edge.node);
}

export function filterNoSlugs({ slug }) {
  return (slug || {}).current;
}

export function filterPublishedInTheFuture({ publishedAt }) {
  return !isFuture(new Date(publishedAt));
}
