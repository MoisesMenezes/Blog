export interface PostProps {
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
  subtitle: string;
}
