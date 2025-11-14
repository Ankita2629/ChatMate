import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import "stream-chat-react/dist/css/v2/index.css";
import { ArrowLeft, Video } from "lucide-react";

import ChatLoader from "../components/ChatLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const navigate = useNavigate();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [friend, setFriend] = useState(null);
  const initializingRef = useRef(false);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });
useEffect(() => {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}, []);
  // Initialize chat
  useEffect(() => {
    if (!tokenData?.token || !authUser || !STREAM_API_KEY || !targetUserId) return;
    if (initializingRef.current) return;

    initializingRef.current = true;

    const initChat = async () => {
      try {
        const client = new StreamChat(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);

        // Get friend info
        const friendId = targetUserId;
        const member = currChannel.state.members[friendId];
        setFriend(member?.user || null);
      } catch (err) {
        console.error("Chat initialization error:", err);
        toast.error("Failed to load chat");
      } finally {
        initializingRef.current = false;
      }
    };

    initChat();

    return () => {
      if (chatClient && chatClient.userID) {
        chatClient.disconnectUser().catch(console.error);
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

  if (!chatClient || !channel || !friend) return <ChatLoader />;
  if (!chatClient.userID) return <ChatLoader />;

  return (
    <div className="h-screen flex flex-col bg-base-200">
      {/* Professional Header with Glass Effect */}
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 md:py-4 bg-base-100 backdrop-blur-md border-b border-base-300 shadow-sm flex-none">
        {/* Left side: Back arrow + friend info */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
          <button
            onClick={() => navigate("/")}
            className="btn btn-ghost btn-circle btn-sm md:btn-md hover:bg-base-200/50 transition-all duration-300 flex-shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="avatar flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100 relative shadow-lg">
                <img src={friend.image} alt={friend.name} className="object-cover" />
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-base-100 shadow-md transition-all duration-300 ${
                    friend.online ? "bg-success animate-pulse" : "bg-base-300"
                  }`}
                />
              </div>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-base-content text-sm sm:text-base truncate">{friend.name}</p>
              <p className="text-xs text-base-content/60 flex items-center gap-1">
                <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${friend.online ? "bg-success" : "bg-base-300"}`}></span>
                <span className="truncate">{friend.online ? "Active now" : "Offline"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Video call button */}
        <button
          onClick={handleVideoCall}
          className="btn btn-circle btn-ghost btn-sm md:btn-md hover:bg-primary/10 hover:text-primary transition-all duration-300 group flex-shrink-0"
          title="Start Video Call"
          aria-label="Start video call"
        >
          <Video className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>

      {/* Chat area with elegant styling */}
      <div className="flex-1 overflow-hidden">
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <Window>
              <MessageList />
              <MessageInput focus />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>

      {/* Custom Elegant Styling */}
      <style>{`
        /* Container */
        .str-chat__container {
          height: 100%;
          background: hsl(var(--b2)) !important;
        }

        .str-chat__main-panel {
          height: 100%;
        }

        .str-chat__channel {
          height: 100%;
        }

        /* Message list with theme background */
        .str-chat__list {
          background: hsl(var(--b2)) !important;
          padding: 1rem 0.75rem;
          height: 100%;
        }

        @media (min-width: 640px) {
          .str-chat__list {
            padding: 1.5rem 1rem;
          }
        }

        @media (min-width: 768px) {
          .str-chat__list {
            padding: 2rem 1.5rem;
          }
        }

        .str-chat__main-panel {
          background: hsl(var(--b2)) !important;
        }

        .str-chat__channel {
          background: hsl(var(--b2)) !important;
        }

        /* Individual messages */
        .str-chat__message-simple {
          margin-bottom: 1rem;
        }

        /* Message bubbles - Elegant design */
        .str-chat__message-simple__text-inner {
          border-radius: 1rem;
          padding: 0.75rem 0.875rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          max-width: 85%;
          line-height: 1.6;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          word-wrap: break-word;
        }

        @media (min-width: 640px) {
          .str-chat__message-simple__text-inner {
            max-width: 75%;
            font-size: 0.9rem;
            padding: 0.8rem 1rem;
          }
        }

        @media (min-width: 768px) {
          .str-chat__message-simple__text-inner {
            border-radius: 1.25rem;
            padding: 0.875rem 1.125rem;
            max-width: 450px;
            font-size: 0.925rem;
          }
        }

        .str-chat__message-simple__text-inner:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        /* Own messages (right side) - Primary colored */
        .str-chat__message-simple--me .str-chat__message-simple__text-inner {
          background: linear-gradient(135deg, hsl(var(--p)) 0%, hsl(var(--p)) 100%);
          color: hsl(var(--pc));
          border-bottom-right-radius: 0.375rem;
        }

        /* Other messages (left side) - Clean white/base */
        .str-chat__message-simple:not(.str-chat__message-simple--me) .str-chat__message-simple__text-inner {
          background: hsl(var(--b1));
          color: hsl(var(--bc));
          border-bottom-left-radius: 0.375rem;
          border: 1px solid hsl(var(--b3) / 0.3);
        }

        /* Avatar styling - Professional */
        .str-chat__avatar {
          margin-right: 0.875rem;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 2px solid hsl(var(--b1));
        }

        /* Message input area - Elegant bottom bar */
        .str-chat__input-flat {
          background: hsl(var(--b1));
          backdrop-filter: blur(12px);
          border-top: 1px solid hsl(var(--b3));
          padding: 0.875rem 1rem;
          box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.06);
        }

        @media (min-width: 640px) {
          .str-chat__input-flat {
            padding: 1rem 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .str-chat__input-flat {
            padding: 1.25rem 1.75rem;
          }
        }

        .str-chat__input-flat-wrapper {
          background: hsl(var(--b1));
          border-radius: 1.5rem;
          padding: 0.375rem;
          border: 1.5px solid hsl(var(--b3));
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        @media (min-width: 768px) {
          .str-chat__input-flat-wrapper {
            border-radius: 1.75rem;
            padding: 0.5rem;
          }
        }

        .str-chat__input-flat-wrapper:focus-within {
          border-color: hsl(var(--p));
          box-shadow: 0 0 0 4px hsla(var(--p), 0.1), 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .str-chat__textarea {
          background: transparent;
        }

        .str-chat__textarea textarea {
          background: transparent;
          border: none;
          border-radius: 1rem;
          padding: 0.5rem 0.875rem;
          font-size: 0.875rem;
          color: hsl(var(--bc));
          min-height: 40px;
          max-height: 120px;
          transition: all 0.2s ease;
        }

        @media (min-width: 640px) {
          .str-chat__textarea textarea {
            padding: 0.575rem 0.95rem;
            font-size: 0.9rem;
            min-height: 42px;
            max-height: 130px;
          }
        }

        @media (min-width: 768px) {
          .str-chat__textarea textarea {
            border-radius: 1.25rem;
            padding: 0.625rem 1rem;
            font-size: 0.95rem;
            min-height: 44px;
            max-height: 140px;
          }
        }

        .str-chat__textarea textarea:focus {
          outline: none;
          background: transparent;
        }

        .str-chat__textarea textarea::placeholder {
          color: hsl(var(--bc) / 0.45);
          font-size: 0.875rem;
        }

        @media (min-width: 768px) {
          .str-chat__textarea textarea::placeholder {
            font-size: 0.925rem;
          }
        }

        /* Send button - Elegant */
        .str-chat__send-button {
          background: linear-gradient(135deg, hsl(var(--p)) 0%, hsl(var(--p)) 100%);
          color: hsl(var(--pc));
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          box-shadow: 0 4px 12px hsla(var(--p), 0.35);
        }

        @media (min-width: 768px) {
          .str-chat__send-button {
            width: 44px;
            height: 44px;
          }
        }

        .str-chat__send-button:hover:not(:disabled) {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 6px 20px hsla(var(--p), 0.45);
        }

        .str-chat__send-button:active:not(:disabled) {
          transform: scale(0.96);
        }

        .str-chat__send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Send button SVG icon */
        .str-chat__send-button svg {
          width: 20px;
          height: 20px;
        }

        /* Timestamp - Subtle */
        .str-chat__message-simple-timestamp {
          font-size: 0.7rem;
          color: hsl(var(--bc) / 0.4);
          margin-top: 0.375rem;
          font-weight: 500;
        }

        /* Reactions - Modern style */
        .str-chat__reaction-list {
          background: hsl(var(--b1));
          border-radius: 1.25rem;
          padding: 0.375rem 0.625rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: 1px solid hsl(var(--b3) / 0.3);
        }

        /* Date separator - Clean */
        .str-chat__date-separator {
          margin: 2rem 0;
        }

        .str-chat__date-separator-date {
          background: hsl(var(--b1) / 0.8);
          backdrop-filter: blur(8px);
          color: hsl(var(--bc) / 0.5);
          padding: 0.5rem 1.25rem;
          border-radius: 1.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          border: 1px solid hsl(var(--b3) / 0.3);
        }

        /* Typing indicator - Smooth */
        .str-chat__typing-indicator {
          background: hsl(var(--b1));
          border: 1px solid hsl(var(--b3) / 0.3);
          border-radius: 1.25rem;
          padding: 0.875rem 1.125rem;
          margin-left: 3.75rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        /* Action buttons - Refined */
        .str-chat__input-flat-emojiselect,
        .str-chat__input-flat-fileupload {
          color: hsl(var(--bc) / 0.5);
          transition: all 0.3s ease;
          padding: 0.5rem;
          border-radius: 0.75rem;
        }

        .str-chat__input-flat-emojiselect:hover,
        .str-chat__input-flat-fileupload:hover {
          color: hsl(var(--p));
          background: hsl(var(--p) / 0.1);
          transform: scale(1.1);
        }

        /* Thread panel */
        .str-chat__thread {
          background: hsl(var(--b1));
          border-left: 1px solid hsl(var(--b3) / 0.4);
          box-shadow: -4px 0 16px rgba(0, 0, 0, 0.04);
        }

        /* Custom scrollbar */
        .str-chat__list::-webkit-scrollbar {
          width: 8px;
        }

        .str-chat__list::-webkit-scrollbar-track {
          background: transparent;
          margin: 0.5rem 0;
        }

        .str-chat__list::-webkit-scrollbar-thumb {
          background: hsl(var(--bc) / 0.15);
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        .str-chat__list::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--bc) / 0.25);
        }

        /* Message attachments */
        .str-chat__message-attachment {
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: 1px solid hsl(var(--b3) / 0.3);
        }

        /* Link preview */
        .str-chat__message-attachment--card {
          border: 1px solid hsl(var(--b3) / 0.4);
          border-radius: 1rem;
          background: hsl(var(--b1));
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .str-chat__message-attachment--card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default ChatPage;