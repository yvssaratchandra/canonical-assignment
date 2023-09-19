import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import Card from "./components/card";
import { transformCardInfo } from "./utils";

const App = () => {
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
              <Card
                id={card.id}
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
