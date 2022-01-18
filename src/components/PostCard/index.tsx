import Link from "next/link";
import { Box, Heading } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { PostProps } from "../../types/post";

interface PostCardProps {
  post: PostProps;
}

function PostCard({ post }: PostCardProps) {
  console.log("post", post);
  return (
    <Link href={`post/${post.slug}`} passHref>
      <a style={{ position: "relative" }}>
        <Image
          borderRadius={8}
          h="350px"
          w="640px"
          src={post.thumbnail.url}
          objectFit="cover"
          objectPosition="center"
          alt={post.thumbnail?.alt}
          filter="grayscale(75%)"
          _hover={{
            filter: "grayscale(0)",
          }}
        />

        <Box padding="1rem" position="absolute" bottom="0">
          <Heading
            as="h2"
            size="lg"
            lineHeight="1.3"
            w="fit-content"
            bgColor="white"
            px="5px"
          >
            {post.title}
          </Heading>
          <Heading as="h5" size="sm" w="fit-content" bgColor="white" px="5px">
            {post.subtitle}
          </Heading>
        </Box>
      </a>
    </Link>
  );
}

export default PostCard;
