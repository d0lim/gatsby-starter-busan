import { Flex, Center, Square, Box, Text, Stack } from "@chakra-ui/layout";
import { throttle } from "lodash";
import * as React from "react";
import useInfiniteScroll from "../../hooks/useIntersectionObserver";
import { PostNode } from "../../pages";
import PostEntry from "./PostEntry";

type PostListProps = {
  postNodes: PostNode[];
};

const PostList = ({ postNodes }: PostListProps) => {
  const [list, setList] = React.useState<PostNode[]>([
    ...postNodes.slice(0, 10),
  ]);
  const [loadMore, setLoadMore] = React.useState<Boolean>(false);
  const [hasMore, setHasMore] = React.useState<Boolean>(postNodes.length > 10);

  const loadRef: any = React.useRef();

  const handleObserver = throttle((entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setLoadMore(true);
    }
  }, 200);

  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: "1px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loadRef.current) {
      observer.observe(loadRef.current);
    }
  }, []);

  React.useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length;
      const isMore = currentLength < postNodes.length;
      const nextResults = isMore
        ? postNodes.slice(currentLength, currentLength + 4)
        : [];
      setList([...list, ...nextResults]);
      setLoadMore(false);
    }
  }, [loadMore, hasMore]);

  React.useEffect(() => {
    const isMore = list.length < postNodes.length;
    setHasMore(isMore);
  }, [list]);

  return (
    <>
      <Stack width="100%" maxWidth="720px" spacing={6}>
        {list.map((postNode, index) => {
          return (
            <PostEntry
              title={postNode.frontmatter.title}
              description={postNode.frontmatter.description}
              publishedAt={postNode.frontmatter.publishedAt}
              tags={postNode.fields.tags}
              series={postNode.fields.series}
              slug={postNode.slug}
              key={index}
            />
          );
        })}
      </Stack>
      <Flex ref={loadRef}>
        {hasMore ? <Text>Loading...</Text> : <Text></Text>}
      </Flex>
    </>
  );
};

export default PostList;
