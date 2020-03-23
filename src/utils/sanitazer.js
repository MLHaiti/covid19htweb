import sanitizeHtml from "sanitize-html";

export default (data) =>
  sanitizeHtml(data, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "div",
      "p",
      "strong",
      "em",
      "u",
      "blockquote",
      "ol",
      "ul",
      "a",
      "li",
      "br",
    ],
    disallowedTagsMode: "discard",
    allowedAttributes: {
      a: ["href", "_target"],
    },
  });
