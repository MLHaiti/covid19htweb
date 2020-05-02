import useSWR from "swr";

export const useScrollTop = () => {
  const { data } = useSWR("articleEditorScrollTop", {
    initialData: { scrollTop: 0 },
  });
  return data;
};
