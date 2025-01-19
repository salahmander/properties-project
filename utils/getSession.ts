import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { CustomSession } from "@/types/index.types";

export const getSessionUser = async () => {
  const session = (await getServerSession(authOptions as any)) as CustomSession; //TODO: fix any

  if (!session || !session.user) {
    return null;
  }

  return {
    user: session.user,
    userId: session.user.id,
  };
};
