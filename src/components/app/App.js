import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../card";
import { transformCardInfo } from "../../utils";
import "./App.scss";

const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log("Inside useEffect");
    axios
      .get(
        "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json"
      )
      .then((response) => {
        const output = response.data.map(transformCardInfo);
        setCards(output);
      });
  }, []);

  return (
    <div className="p-strip">
      <div className="row">
        {cards.map((card) => {
          return (
            <div className="col-4 u-equal-height" key={card.id}>
              <Card
                link={card.link}
                title={card.title}
                topic={card.topic}
                imageInfo={card.imageInfo}
                date={card.date}
                author={card.author}
                category={card.category}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
