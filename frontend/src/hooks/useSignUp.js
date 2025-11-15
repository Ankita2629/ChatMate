import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import toast from "react-hot-toast"; // ✅ Add this import

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      // ✅ ADD THESE LINES - Save token and userId to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user?._id) {
        localStorage.setItem("userId", data.user._id);
      }

      // Show success message
      toast.success("Account created successfully!");

      // Invalidate auth query to refetch user
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      // ✅ ADD THIS - Show error toast
      toast.error(error.response?.data?.message || "Signup failed");
    },
  });

  return { isPending, error, signupMutation: mutate };
};

export default useSignUp;