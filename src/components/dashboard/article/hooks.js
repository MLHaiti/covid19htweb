import useSWR from "swr";

export const useArticles = async () => {
  const { data, error } = useSWR("/getAllArticles", async () => {
    const a = window.localStorage.getItem("@articleList");
    return a ? JSON.parse(a) : [];
  });

  console.log(data);

  return { data, error };
};
