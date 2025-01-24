import connectDB from "@/config/database";

import Message from "@/models/Messages";

import MessageCard from "@/components/MessageCard/MessageCard";

import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSession";

import type { MessagesType } from "@/types/message.types";

const MessagesPage = async () => {
  connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser?.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const readMessages = await Message.find({
    recipient: userId,
    read: true,
  })
    .sort({ createdAt: -1 }) // Sort read messages in asc order
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 }) // Sort unread messages in asc order
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messagesDoc = [...unreadMessages, ...readMessages];

  // Convert to serializable object so we can pass to client component.
  const messages = messagesDoc.map((messageDoc) => {
    const serializedMessage = convertToSerializableObject(messageDoc);
    serializedMessage.sender = convertToSerializableObject(messageDoc.sender);
    serializedMessage.property = convertToSerializableObject(messageDoc.property);

    return serializedMessage;
  }) as MessagesType;

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => <MessageCard message={message} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
