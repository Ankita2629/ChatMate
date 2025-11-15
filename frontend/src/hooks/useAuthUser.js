import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { 
    isLoading, 
    authUser: data?.user || null,
    isError: !!error
  };
};

export default useAuthUser;