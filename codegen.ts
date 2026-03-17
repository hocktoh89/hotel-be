import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./**/*.graphql.ts",
  generates: {
    "./src/types/resolvers-types.ts":{
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        defaultMapper: "Partial<{T}>",
        scalar: {
          DateTime: "Date"
        },
        contextType: "../context#Context",
        // mappers: {
        //   // TODO
        //   // Map your GraphQL types to your database models
        //   // Eg.
        //   // User: "../models/User#UserModel",
        // },
      },
    },
  },
};

export default config;