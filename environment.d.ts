declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRISMIC_TOKEN: string;
      PRISMIC_URL: string;
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
