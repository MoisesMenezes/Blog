import { GetStaticPaths, GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";

type PostContent = {
  title: string;
  updatedAt: string;
  content: string;
};

interface PostProps {
  post: PostContent;
}

export const Post = ({ post }: PostProps) => {
  const router = useRouter();

  console.log("post", post);

  return router.isFallback ? (
    <h1>Carregando</h1>
  ) : (
    <>
      <main>
        <h1>{post.title}</h1>
        <span>{post.updatedAt}</span>

        <article>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
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
    content: RichText.asHtml(response.data.content),
    updatedAt:
      response.last_publication_date &&
      new Date(response.last_publication_date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
  };

  return {
    props: { post },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Post;
