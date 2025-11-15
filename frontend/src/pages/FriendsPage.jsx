import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { Link } from "react-router-dom";
import { Users, UserPlus } from "lucide-react";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="min-h-screen bg-base-100">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="container mx-auto max-w-7xl space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Your Friends
              </h1>
              <p className="text-sm sm:text-base text-base-content/70 mt-1">
                {friends.length} {friends.length === 1 ? "friend" : "friends"} connected
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Link 
                to="/notifications" 
                className="btn btn-outline btn-sm sm:btn-md flex-1 sm:flex-none"
              >
                <Users className="size-4" />
                <span className="hidden sm:inline">Friend Requests</span>
                <span className="sm:hidden">Requests</span>
              </Link>
              <Link 
                to="/" 
                className="btn btn-primary btn-sm sm:btn-md flex-1 sm:flex-none"
              >
                <UserPlus className="size-4" />
                <span className="hidden sm:inline">Find Friends</span>
                <span className="sm:hidden">Find</span>
              </Link>
            </div>
          </div>

          {/* Friends Grid */}
          {isLoading ? (
            <div className="flex justify-center py-12 sm:py-16 lg:py-20">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : friends.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16">
              <NoFriendsFound />
              <Link to="/" className="btn btn-primary mt-6">
                <UserPlus className="size-4" />
                Discover Language Partners
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;