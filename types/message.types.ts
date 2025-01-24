import type { Types } from "mongoose";

export type MessageType = {
  _id: Types.ObjectId;
  sender: {
    _id: Types.ObjectId;
    name: string;
  };
  recipient: Types.ObjectId;
  property: {
    _id: Types.ObjectId;
    name: string;
  };
  name: string;
  phone: string;
  email: string;
  body: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type MessagesType = MessageType[];
