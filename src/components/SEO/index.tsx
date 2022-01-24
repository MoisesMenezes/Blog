import Head from "next/head";

interface SEOPros {
  title: string;
  description: string;
}

export const SEO = ({ title, description }: SEOPros) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description}></meta>
    </Head>
  );
};
