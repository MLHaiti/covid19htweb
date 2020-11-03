export const articleTypeInfo = [
  {
    value: "Tradiksyon",
    labels: [
      "Gen anpil bon konteni sou sit piblik tankou OMS e tradwi yo an kreyòl/fransè ap ede plis moun gen aksè ak yo",
      "Fòk ou meete lyen pou atik orijinèl la",
      "Tanpri pa tradwi konteni ki pa nan domèn piblik",
    ],
  },
  {
    value: "Orijinal",
    labels: [
      "Yon prodiksyon orijinal. Nou ankouraje ou mete referans rechèch ou yo nan pati ki la pou sa",
    ],
  },
];

export const articleTypeOptions = [
  { value: "translation", label: "Tradiksyon" },
  { value: "original", label: "Orijinal" },
];

export const saveArticle = async (article) => {
  const d = new Date().toISOString();

  let list = window.localStorage.getItem("@articleList");
  list = list ? JSON.parse(list) : [];

  let newArticle = true;
  list = list.map((a) => {
    if (a.id === article.id) {
      newArticle = false;
      return {
        ...article,
        updatedAt: d,
      };
    }
    return a;
  });

  if (newArticle) {
    list = [...list, { ...article, createdAt: d, updatedAt: d }];
  }

  window.localStorage.setItem("@articleList", JSON.stringify(list));
  return true;
};
