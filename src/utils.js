import { singular } from "pluralize";

const getTopic = (term) => {
  const topicObj = term.flat(2).find((x) => x.taxonomy === "topic");
  return topicObj || { name: "Miscellaneous", slug: "miscellaneous" };
};
const getCategory = (term) => {
  const categoryObj = term.flat(2).find((x) => x.taxonomy === "category");
  return categoryObj ? singular(categoryObj.name) : "No category";
};

const getAuthor = (authorId, authorsInEmbedded) => {
  const authorDetails = authorsInEmbedded.find(
    (author) => author.id === authorId
  );
  return {
    name: authorDetails?.name || "Anonymous",
    link: authorDetails?.link || "#",
  };
};

const getDate = (date) => {
  return new Date(date).toLocaleString("default", { dateStyle: "long" });
};

const getImageAltText = (featuredMedia) => {
  return featuredMedia?.[0]?.alt_text || "";
};

export const transformCardInfo = (cardInfo) => {
  const imageInfo = {
    src: cardInfo.featured_media,
    alt: getImageAltText(cardInfo._embedded["wp:featuredmedia"]),
  };
  return {
    id: cardInfo.id,
    title: cardInfo.title.rendered,
    link: cardInfo.link,
    topic: getTopic(cardInfo._embedded["wp:term"]),
    imageInfo,
    date: getDate(cardInfo.date),
    author: getAuthor(cardInfo.author, cardInfo._embedded.author),
    category: getCategory(cardInfo._embedded["wp:term"]),
  };
};
