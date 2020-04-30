import useSWR from "swr";

const initialStore = {
  toolbar: {
    height: 57,
    top: 10,
  },
  afterEditor: {
    height: 1,
    top: 20,
  },
};

export const useScroll = () => {
  const { data } = useSWR("articleEditorSrolling", {
    initialData: initialStore,
  });
  return data;
};

export const useToolbarPosition = () => {
  const { data } = useSWR("articleEditorToolbarPosition", {
    initialData: { height: 57, top: 10 },
  });
  return data;
};

export const useScrollTop = () => {
  const { data } = useSWR("articleEditorScrollTop", {
    initialData: { scrollTop: 0 },
  });
  return data;
};
