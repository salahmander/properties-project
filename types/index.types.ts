import type { Session, Profile } from "next-auth";
import type { BuiltInProviderType } from "next-auth/providers/index";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";

export type ProvidersType = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>;

export type CustomSession = Session & {
  user: {
    id: string;
    email: string;
    name?: string;
    image?: string;
  };
};

export type GoogleProfileType = Profile & {
  name: string;
  email: string;
  picture?: string;
}