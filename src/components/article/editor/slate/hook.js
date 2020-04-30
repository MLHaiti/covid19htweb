import useSWR from "swr";

export const useToolbarPosition = () => {
  const { data } = useSWR("articleEditorToolbarPosition", {
    initialData: { height: 0, top: 0 },
  });
  return data;
};

export const useScrollTop = () => {
  const { data } = useSWR("articleEditorScrollTop", {
    initialData: { scrollTop: 0 },
  });
  return data;
};
