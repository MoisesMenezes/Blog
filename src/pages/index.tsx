import type { GetStaticProps } from "next";
import { getPrismicClient } from "../services/prismic";
import Image from "next/Image";
import Prismic from "@prismicio/client";
import PostCard from "../components/PostCard";
import { Box, Grid, Heading } from "@chakra-ui/react";
import { PostProps } from "../types/post";
import Header from "../components/Header";

interface HomeProps {
  posts: PostProps[];
}

const Home = ({ posts }: HomeProps) => {
  return (
    <>
      <Header />
      <Grid position="relative">
        <Heading
          as="h1"
          zIndex={100}
          position="absolute"
          placeSelf="center"
          color="#FFF"
          fontSize={{ sm: "3rem", md: "5rem", lg: "8rem", xl: "10rem" }}
          fontFamily="Pacifico"
        >
          Let&apos;s Travel
        </Heading>
        <Image
          src="/bighero2.jpg"
          width={1400}
          height={510}
          layout="responsive"
          alt="Let's travel"
        />
      </Grid>
      <Box as="section" p="1rem" mt={{ md: "4rem", lg: "8rem" }}>
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
    </>
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
