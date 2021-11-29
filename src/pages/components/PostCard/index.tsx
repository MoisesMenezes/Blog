import Image from "next/image";
import * as S from "./styles";
import Router from "next/router";
import Link from "next/link";

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
  const handleClick = () => {
    Router.push(`post/${post.slug}`);
  };

  return (
    <Link href={`post/${post.slug}`} passHref>
      <a>
        <Image
          src={post.thumbnail.url}
          width={post.thumbnail.dimensions.width}
          height={post.thumbnail.dimensions.height}
          alt={post.thumbnail?.alt}
        />
        <h2>{post.title}</h2>
      </a>
    </Link>
  );
}

export default PostCard;
