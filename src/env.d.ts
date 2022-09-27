declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NEST_PORT: string;
      readonly DATABASE_TYPE: string;
      readonly DATABASE_HOST: string;
      readonly DATABASE_PORT: string;
      readonly DATABASE_USERNAME: string;
      readonly DATABASE_PASSWORD: string;
      readonly DATABASE: string;
      readonly DATABASE_SYNCHRONIZE: string;
      readonly JWT_SECRET: string;
    }
  }
}

export {};
