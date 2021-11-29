import type { GetStaticProps, NextPage } from "next";
import { getPrismicClient } from "../services/prismic";
import styles from "../styles/Home.module.css";
import Prismic from "@prismicio/client";

interface PostProps {
  slug: string;
  thumbnail: string;
  title: string;
}
interface HomeProps {
  posts: PostProps[];
}

const Home = ({ posts }: HomeProps) => {
  console.log("POSTS", posts);

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <>
          <h1>{post.title}</h1>
        </>
      ))}
    </div>
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
      thumbnail: post.data.thumbnail.url,
      title: post.data.title[0].text,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default Home;
