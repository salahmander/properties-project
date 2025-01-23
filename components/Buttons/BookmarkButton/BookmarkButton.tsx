"use client";
import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";

import type { CustomSession } from "@/types/index.types";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import type { PropertyType } from "@/types/properties.types";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";

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

  const userId = customSession?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
    }

    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setIsLoading(false);
    });
  }, [property._id, userId, checkBookmarkStatus]);

  const handleClick = async () => {
    bookmarkProperty(property._id).then((res: BookmarkPropertyResponse) => {
      if (res.error) return toast.error(res.error);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

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
