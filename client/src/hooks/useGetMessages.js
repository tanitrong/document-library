import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axiosInstance from "../api/axios";
import { server } from "../server";
import { toast } from "react-toastify";

const useGetMessages = () => {
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedConversation } = useConversation();
  const selectedId = selectedConversation
    ? selectedConversation._id
    : "65f7c03cdeb32b18f0b466a6";

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axiosInstance.get(
          `${server}/messages/${selectedId}`
        );
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedId) getMessages();
    // if (isAdminSide) getMessages();
  }, [selectedId, setMessages]);
  return { messages, loading };
};

export default useGetMessages;
