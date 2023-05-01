import { useMutation, UseMutationResult } from "@tanstack/react-query";


const useSendToAPI = (
  request: any,
  onSuccess?:any,
  onError?:any
): UseMutationResult<unknown, any, any, unknown> => {
  return useMutation(request, {
    onSuccess: (res: any) => {
      const { isSuccessful } = res?.data;
      if (onSuccess && isSuccessful) {
        onSuccess(res?.data);
      }
      if (onError && !isSuccessful) {
        onError(res?.data);
      }
    },
    onError: (error: any) => {
      if (onError) {
        onError(error);
      }
    },
  });
};

export default useSendToAPI;
