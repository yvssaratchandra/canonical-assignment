import { singular } from "pluralize";

const getTopic = (term) => {
  // Flattening the array here and finding because I was unsure if topics are
  // always in 2nd index of wp:term array
  const topicObj = term.flat(2).find((x) => x.taxonomy === "topic");
  return topicObj || { name: "Miscellaneous", slug: "miscellaneous" };
};
const getCategory = (term) => {
  // Flattening the array here and finding because I was unsure if categories
  // are always in 0th index of wp:term array
  const categoryObj = term.flat(2).find((x) => x.taxonomy === "category");
  return categoryObj ? singular(categoryObj.name) : "Uncategorized";
};

const getAuthor = (authorId, authorsInEmbedded) => {
  // Finding the author name using authorId because I was unsure if the author
  // array in _embedded always contains a single entry
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
