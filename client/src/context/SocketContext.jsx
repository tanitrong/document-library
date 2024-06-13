import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export const SoketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SoketContext);
};

export const SoketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const authUser = useSelector((state) => state.user.user);

  useEffect(() => {
    if (authUser) {
      const socket = io("https://dtdoc.onrender.com", {
        // const socket = io("http://localhost:3003", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        if (socket.readyState === 1) {
          socket.close();
        }
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SoketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SoketContext.Provider>
  );
};
