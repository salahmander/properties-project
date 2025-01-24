"use client";

import { useEffect, useActionState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import addMessage from "@/app/actions/addMessage";
import { PropertyType } from "@/types/properties.types";
import { FaPaperPlane } from "react-icons/fa";

type PropertyContactFormType = {
  property: PropertyType;
};

const PropertyContactForm = ({ property }: PropertyContactFormType) => {
  const { data: session } = useSession();

  const handleAddMessage = async (previousState: any, formData: FormData) => {
    // Append additional data
    formData.append("property", property._id.toString());
    formData.append("recipient", property.owner.toString());

    // Call your original addMessage function
    return addMessage(formData);
  };
  const [state, formAction, isPending] = useActionState(handleAddMessage, {
    error: "",
    submitted: false,
  });

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.submitted) toast.success(state.message);
  }, [state]);

  if (state.submitted) {
    return (
      <p className="text-green-500 mb-4">
        Your message has been sent successfully
      </p>
    );
  }

  return (
    session && (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        <form action={formAction}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <FaPaperPlane className="mr-2" />{" "}
              {isPending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default PropertyContactForm;
