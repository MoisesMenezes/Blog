import type { GetStaticProps } from "next";
import { getPrismicClient } from "../services/prismic";
import Image from "next/image";
import Prismic from "@prismicio/client";
import PostCard from "../components/PostCard";
import { Box, Grid, Heading } from "@chakra-ui/react";
import { PostProps } from "../types/post";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SEO } from "../components/SEO";

interface HomeProps {
  posts: PostProps[];
}

const Home = ({ posts }: HomeProps) => {
  return (
    <>
      <SEO
        title="Travel Blog | Home"
        description="Travel blog os melhores destinos para viajar"
      />
      <Header />
      <Grid position="relative">
        <Heading
          as="h1"
          zIndex={100}
          maxW="75%"
          left="0"
          position="absolute"
          placeSelf="end"
          p="0 1rem 2rem 1rem"
          color="#FFF"
          fontSize={{ sm: "1.5rem", md: "3rem", lg: "4rem", xl: "6rem" }}
        >
          Get new Experience and Greater Adventures.
        </Heading>
        <Image
          src="/bighero2.jfif"
          width={1200}
          height={550}
          layout="responsive"
          alt="Let's travel"
        />
      </Grid>
      <Box as="section" p="1rem" mt={{ md: "2rem", lg: "3rem" }}>
        <Heading pb="1rem">Latest Post</Heading>
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
      <Footer />
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
