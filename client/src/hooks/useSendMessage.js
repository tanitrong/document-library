import { useState } from "react";
import useConversation from "../zustand/useConversation";
import axiosInstance from "../api/axios";
import { server } from "../server";
import { toast } from "react-toastify";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const selectedId = selectedConversation
    ? selectedConversation._id
    : "65f7c03cdeb32b18f0b466a6";

  const sendMessage = async (message) => {
    try {
      const { data } = await axiosInstance.post(
        `${server}/messages/send/${selectedId}`,
        { message }
      );
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
