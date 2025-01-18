import type { BuiltInProviderType } from "next-auth/providers/index";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";

export type ProvidersType = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;