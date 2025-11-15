import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router-dom";
import { CheckCircle, MapPin, UserPlus, Users, ArrowRight } from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
       if (req?.recipient?._id) {
        outgoingIds.add(req.recipient._id);
      }
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  // Show only first 5 friends on home page
  const displayedFriends = friends.slice(0, 5);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="container mx-auto max-w-7xl space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Quick Friends Preview Section */}
          {friends.length > 0 && (
            <section>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                    Your Friends
                  </h2>
                  <p className="text-xs sm:text-sm text-base-content/70 mt-1">
                    {friends.length} {friends.length === 1 ? "friend" : "friends"} connected
                  </p>
                </div>
                <Link 
                  to="/friends" 
                  className="btn btn-outline btn-sm sm:btn-md w-full sm:w-auto"
                >
                  <Users className="size-4" />
                  <span>View All Friends</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              {/* Friends Preview Grid */}
              {loadingFriends ? (
                <div className="flex justify-center py-8">
                  <span className="loading loading-spinner loading-md" />
                </div>
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                  {displayedFriends.map((friend) => (
                    <FriendCard key={friend._id} friend={friend} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Recommended Users Section */}
          <section className="pt-4 sm:pt-6 lg:pt-8">
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex flex-col gap-2 sm:gap-3">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                    Discover Language Partners
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-base-content/70">
                    Connect with learners who match your language goals
                  </p>
                </div>
                <Link 
                  to="/notifications" 
                  className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto"
                >
                  <Users className="size-4" />
                  <span className="hidden sm:inline">Friend Requests</span>
                  <span className="sm:hidden">Requests</span>
                </Link>
              </div>
            </div>

            {loadingUsers ? (
              <div className="flex justify-center py-8 sm:py-12 lg:py-16">
                <span className="loading loading-spinner loading-md sm:loading-lg" />
              </div>
            ) : recommendedUsers.length === 0 ? (
              <div className="card bg-base-200 shadow-md">
                <div className="card-body p-4 sm:p-6 text-center">
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    No recommendations available
                  </h3>
                  <p className="text-xs sm:text-sm text-base-content/70">
                    Check back later for new language partners!
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {recommendedUsers.map((user) => {
                  const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                  return (
                    <div
                      key={user._id}
                      className="card bg-base-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                      <div className="card-body p-4 sm:p-5 space-y-3 sm:space-y-4">
                        {/* User Info */}
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="avatar flex-shrink-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-200">
                              <img 
                                src={user.profilePic} 
                                alt={user.fullName}
                                className="object-cover"
                              />
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-base sm:text-lg truncate">
                              {user.fullName}
                            </h3>
                            {user.location && (
                              <div className="flex items-center text-xs sm:text-sm text-base-content/70 mt-0.5 sm:mt-1">
                                <MapPin className="size-3 mr-1 flex-shrink-0" />
                                <span className="truncate">{user.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Languages with flags */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-1.5 sm:gap-2">
                          <span className="badge badge-secondary text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-3">
                            <span className="mr-1">{getLanguageFlag(user.nativeLanguage)}</span>
                            <span className="hidden xs:inline">Native: </span>
                            {capitialize(user.nativeLanguage)}
                          </span>
                          <span className="badge badge-outline text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-3">
                            <span className="mr-1">{getLanguageFlag(user.learningLanguage)}</span>
                            <span className="hidden xs:inline">Learning: </span>
                            {capitialize(user.learningLanguage)}
                          </span>
                        </div>

                        {/* Bio */}
                        {user.bio && (
                          <p className="text-xs sm:text-sm text-base-content/70 line-clamp-2 sm:line-clamp-3">
                            {user.bio}
                          </p>
                        )}

                        {/* Action button */}
                        <button
                          className={`btn btn-sm sm:btn-md w-full mt-2 ${
                            hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                          }`}
                          onClick={() => sendRequestMutation(user._id)}
                          disabled={hasRequestBeenSent || isPending}
                        >
                          {hasRequestBeenSent ? (
                            <>
                              <CheckCircle className="size-3 sm:size-4" />
                              <span className="text-xs sm:text-sm">Request Sent</span>
                            </>
                          ) : (
                            <>
                              <UserPlus className="size-3 sm:size-4" />
                              <span className="text-xs sm:text-sm hidden xs:inline">
                                Send Friend Request
                              </span>
                              <span className="text-xs sm:text-sm xs:inline">
                                Add Friend
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;