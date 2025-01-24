import type { Session, Profile } from "next-auth";
import type { BuiltInProviderType } from "next-auth/providers/index";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import type { PropertiesType } from "./properties.types";
import type { Types } from "mongoose";

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
};

export type UserType = {
  _id: string;
  email: string;
  username: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  bookmarks: PropertiesType;
};

export type GlobalContextType = {
  unreadCount: number;
  setUnreadCount: (count: number | ((prevCount: number) => number)) => void;
};
