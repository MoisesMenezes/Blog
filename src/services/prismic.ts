import Prismic from "@prismicio/client";
import { DefaultClient } from "@prismicio/client/types/client";

const PRISMIC_TOKEN = process.env.PRISMIC_TOKEN;
const PRISMIC_URL = process.env.PRISMIC_URL;

export function getPrismicClient(req?: unknown): DefaultClient {
  const prismic = Prismic.client(PRISMIC_URL, {
    req,
    accessToken: PRISMIC_TOKEN,
  });

  return prismic;
}

//TODO
// VER O ENV VIR UNDEFINED
