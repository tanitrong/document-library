import { useEffect, useState } from "react";
import instanceAxios from "../api/axios";
import { server } from "../server";
import { toast } from "react-toastify";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const { data } = await instanceAxios.get(`${server}/user/get-all-user`);
        if (!data.users) throw new Error("No user found");
        setConversations(data.users);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
