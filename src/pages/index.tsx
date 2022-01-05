import type { GetStaticProps } from "next";
import { getPrismicClient } from "../services/prismic";
import Prismic from "@prismicio/client";
import PostCard from "../components/PostCard";
import { Box, Grid } from "@chakra-ui/react";
import { PostProps } from "../types/post";

interface HomeProps {
  posts: PostProps[];
}

const Home = ({ posts }: HomeProps) => {
  return (
    <Box as="section" p="1rem">
      <Grid
        templateColumns={{ lg: "repeat(2,1fr)", "2xl": "repeat(3,1fr)" }}
        justifyItems="center"
        gap="1rem"
      >
        {posts.map((post) => (
          <PostCard post={post} key={post.slug} />
        ))}
      </Grid>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    Prismic.Predicates.at("document.type", "post-2"),
    { orderings: "[my.post.date desc]" }
  );

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      thumbnail: post.data.thumbnail,
      title: post.data.title[0].text,
      subtitle: post.data.subtitle[0] ? post.data.subtitle[0].text : "",
    };
  });

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Home;
