import { useState, useEffect } from "react";
import axios from "axios";
import { singular } from "pluralize";
import "./App.scss";
// import Note from './components/Note'

const App = () => {
  const getTopic = (term) => {
    const topicObj = term.flat(2).find((x) => x.taxonomy === "topic");
    return topicObj ? topicObj.name : "Miscellaneous";
  };

  const getCategory = (term) => {
    const categoryObj = term.flat(2).find((x) => x.taxonomy === "category");
    return categoryObj ? singular(categoryObj.name) : "No category";
  };

  const transformCardInfo = (cardInfo) => {
    return {
      id: cardInfo.id,
      title: cardInfo.title.rendered,
      topic: getTopic(cardInfo._embedded["wp:term"]),
      imgSource: cardInfo.featured_media,
      date: cardInfo.date,
      author: cardInfo._embedded.author,
      category: getCategory(cardInfo._embedded["wp:term"]),
    };
  };
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios
      .get(
        "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json"
      )
      .then((response) => {
        console.log("promise fulfilled", { response });
        const output = response.data.map(transformCardInfo);
        setCards(output);
      });
  }, []);

  return (
    <div className="p-strip">
      <div className="row u-clearfix">
        {cards.map((card) => {
          return (
            <div className="col-4 u-equal-height col-medium-2" key={card.id}>
              <div className="p-card--highlighted highlight-margin ">
                <header>
                  <h5 className="p-muted-heading u-no-margin-bottom">
                    {card.topic.toUpperCase()}
                  </h5>
                  {/* <hr class="p-rgule--muted" /> */}
                </header>
                <div className="p-card__content body">
                  <img
                    className="p-card__image"
                    height="185"
                    width="330"
                    src={card.imgSource}
                  />
                  <h3 className="p-heading--4">
                    <a href="#">{card.title}</a>
                  </h3>
                  <p>
                    <em>
                      By <a>cmoullec</a> on 20 July 2020
                    </em>
                  </p>
                </div>
                {/* <hr className="p-rule--muted" /> */}
                <p className="p-card__footer footer">{card.category}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
