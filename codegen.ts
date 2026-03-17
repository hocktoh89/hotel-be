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
        mappers: {
          RoomType: "@/generated/prisma/client#RoomType",
          UserRole: "@/generated/prisma/client#UserRole",
          BookingStatus: "@/generated/prisma/client#BookingStatus"
        },
      },
    },
  },
};

export default config;