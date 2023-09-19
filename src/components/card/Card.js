const Card = ({
  id,
  link,
  title,
  topic,
  imageInfo,
  date,
  author,
  category,
}) => {
  return (
    <div className="p-card--highlighted highlight-margin ">
      <header>
        <h5 className="p-heading heading u-no-margin-bottom">
          {topic.toUpperCase()}
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
