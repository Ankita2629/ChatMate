import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import "stream-chat-react/dist/css/v2/index.css";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const initializingRef = useRef(false);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });
  useEffect(() => {
  if (!channel) return;

  const handleNewMessage = (event) => {
    console.log("New message received:", event.message);
    // You could also update state here to show notifications
  };

  channel.on("message.new", handleNewMessage);

  return () => {
    channel.off("message.new", handleNewMessage);
  };
}, [channel]);

  useEffect(() => {
    if (!tokenData?.token || !authUser || !STREAM_API_KEY || !targetUserId) {
      return;
    }

    // Prevent multiple simultaneous initializations
    if (initializingRef.current) {
      return;
    }

    initializingRef.current = true;

    const initChat = async () => {
      try {
        console.log("Initializing chat...");

        // Create new client instance
        const client = new StreamChat(STREAM_API_KEY);

        // Connect user and wait for connection to be ready
        const connectionPromise = client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        // Wait for connection to be established
        await connectionPromise;
        
        // Additional wait to ensure client is fully ready
        await new Promise(resolve => setTimeout(resolve, 300));

        console.log("User connected:", client.userID);

        // Create and watch channel
        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();
        console.log("Channel ready");

        // Set state only after everything is ready
        setChatClient(client);
        setChannel(currChannel);
      } catch (err) {
        console.error("Chat initialization error:", err);
        toast.error("Failed to load chat");
      } finally {
        initializingRef.current = false;
      }
    };

    initChat();

    // Cleanup function
    return () => {
      if (chatClient && chatClient.userID) {
        chatClient.disconnectUser().then(() => {
          console.log("User disconnected");
        }).catch(err => {
          console.error("Disconnect error:", err);
        });
      }
      setChatClient(null);
      setChannel(null);
    };
  }, [authUser?._id, tokenData?.token, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  // Show loader while initializing
  if (!chatClient || !channel) {
    return <ChatLoader />;
  }

  // Double-check client is ready before rendering Chat component
  if (!chatClient.userID) {
    return <ChatLoader />;
  }

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;