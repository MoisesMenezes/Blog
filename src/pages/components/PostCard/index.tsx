import Link from "next/link";
import { Box, Heading } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

interface Post {
  slug: string;
  thumbnail: {
    alt: string;
    url: string;
    dimensions: {
      width: number;
      height: number;
    };
  };
  title: string;
}

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`post/${post.slug}`} passHref>
      <a>
        <Box
          bg="white"
          borderRadius={8}
          h="280px"
          w="550px"
          overflow="hidden"
          position="relative"
        >
          {/* TODO colocar animação do grayScale */}

          <Image
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
              lineHeight="0.9"
              w="fit-content"
              bgColor="white"
              px="5px"
            >
              Machu Picchu
            </Heading>
            <Heading as="h5" size="sm" w="fit-content" bgColor="white" px="5px">
              Teste de letra
            </Heading>
          </Box>
        </Box>
      </a>
    </Link>
  );
}

export default PostCard;
