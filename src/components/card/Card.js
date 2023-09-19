import cn from "classnames";
import "./Card.scss";

const Card = ({
  link,
  title,
  topic: { name: topicName, slug: topicSlug },
  imageInfo,
  date,
  author,
  category,
}) => {
  const headerClasses = {
    "highlight-header--people-and-culture": topicSlug === "people-and-culture",
    "highlight-header--canonical-announcements":
      topicSlug === "canonical-announcements",
    "highlight-header--miscellaneous": topicSlug === "miscellaneous",
  };
  return (
    <div className="p-card--highlighted card-container">
      <header className={cn(headerClasses)}>
        <h5 className="p-heading heading u-no-margin-bottom">
          {topicName.toUpperCase()}
        </h5>
      </header>
      <div className="p-card__content body">
        <img
          className="p-card__image"
          height="185"
          width="330"
          src={imageInfo.src}
          alt={imageInfo.alt}
        />
        <h3 className="p-heading--4">
          <a href={link}>{title}</a>
        </h3>
        <p>
          <em>
            By <a href={author.link}>{author.name}</a> on {date}
          </em>
        </p>
      </div>
      <p className="p-card__footer footer">{category}</p>
    </div>
  );
};

export default Card;
