"use client";
import { useState } from "react";

import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";

import type { CustomSession } from "@/types/index.types";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import type { PropertyType } from "@/types/properties.types";

type BookmarkButtonProps = {
  property: PropertyType;
};

type BookmarkPropertyResponse = {
  message: string;
  isBookmarked: any;
  error?: string;
};

const BookmarkButton = ({ property }: BookmarkButtonProps) => {
  const { data: session } = useSession();
  const customSession = session as CustomSession;

  const [isBookmarked, setIsBookmarked] = useState(false);

  const userId = customSession?.user?.id;

  const handleClick = async () => {
    bookmarkProperty(property._id).then((res: BookmarkPropertyResponse) => {
      if (res.error) return toast.error(res.error);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };

  if (!userId) return;

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
