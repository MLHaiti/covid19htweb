import { useEffect, useState } from "react";
import Router from "next/router";
import fetch from "utils/fetch";
import useSWR from "swr";

export const useEnforceAuth = (redirectTo = "/dashboard") => {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch("/api/me")
      .then((r) => {
        setUser(r.user);
      })
      .catch(() => {
        Router.push(`/login?&redirect=${redirectTo}`);
      });
  }, []); // How often should this be running
  return user;
};

export const useUser = (redirectTo = "/dashboard") => {
  const { data, error } = useSWR("/api/me", fetch);

  if (error) {
    Router.push(`/login?&redirect=${redirectTo}`);
    return;
  }
  if (!data) {
    return null;
  }
  if (data) {
    return data.user;
  }
};
