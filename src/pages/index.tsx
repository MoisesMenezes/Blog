import type { GetStaticProps, NextPage } from "next";
import { getPrismicClient } from "../services/prismic";
import styles from "../styles/Home.module.css";
import Prismic from "@prismicio/client";
import PostCard from "./components/PostCard";
import { Box, Grid, HStack, VStack } from "@chakra-ui/react";

interface PostProps {
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
interface HomeProps {
  posts: PostProps[];
}

const Home = ({ posts }: HomeProps) => {
  return (
    <Box as="section">
      <Grid templateColumns={{ md: "repeat(2,1fr)" }} justifyItems="center">
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
