import Router from "next/router";
import fetch from "utils/fetch";
import useSWR, { mutate } from "swr";

/**
 *
 * @param {String} redirectTo Need to pass like ?&redirect=/dashboard
 */
export const useUser = (redirectTo = "") => {
  const { data, error } = useSWR("/api/user/me", fetch);

  if (error) {
    Router.push(`/login${redirectTo}`);
    return;
  }
  if (!data) {
    return null;
  }
  if (data) {
    mutate("userState", { ...data.user }, false);
    return data.user;
  }
};
