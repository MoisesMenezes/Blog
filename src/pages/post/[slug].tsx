import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { Box, Grid, Heading } from "@chakra-ui/react";

type PostContent = {
  title: string;
  content: string;
  thumbnail: string;
  subtitle: string;
};

interface PostProps {
  post: PostContent;
}

export const Post = ({ post }: PostProps) => {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Carregando</h1>
  ) : (
    <>
      <main>
        <Image
          src={post.thumbnail}
          width={1400}
          height={600}
          layout="responsive"
          alt={post.title}
        />
        <Box p={{ base: "1rem", lg: "3rem 2rem" }}>
          <Heading
            as="h1"
            fontFamily="Pacifico"
            fontSize={{ base: "2.5rem", md: "5rem", lg: "7rem", xl: "9rem" }}
          >
            {post.title}
          </Heading>
          <Heading
            as="h2"
            fontFamily="Pacifico"
            mt="2.2rem"
            fontSize={{ base: "1rem", md: "2rem", lg: "3rem", xl: "3.5rem" }}
          >
            {post.subtitle}
          </Heading>
        </Box>

        <Box as="article" p={{ base: "1rem", md: "1rem 2rem" }}>
          <Grid
            fontSize={{ base: "1rem", md: "1.5rem" }}
            fontFamily="Roboto"
            gap="1.2rem"
            justifyItems="center"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Box>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    Prismic.Predicates.at("document.type", "post-2"),
    { orderings: "[my.post.date desc]" }
  );

  const paths = response.results.map((post) => ({
    params: {
      slug: post.uid,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient();
  const { slug } = params as Params;

  const response = await prismic.getByUID("post-2", String(slug), {
    lang: "pt-br",
  });

  const post = {
    title: response.data.title[0].text,
    thumbnail: response.data.thumbnail.url,
    subtitle: response.data.subtitle[0].text,
    content: RichText.asHtml(response.data.content),
  };

  return {
    props: { post },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Post;
