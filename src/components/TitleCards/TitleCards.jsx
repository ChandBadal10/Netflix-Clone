import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
function TitleCards({ title, category }) {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGQ4MDNmZGFlYjc5OTM4OTE5YmFhOWEzMGEyMGRiZCIsIm5iZiI6MTc1MDc2MDQ4MC4zODcsInN1YiI6IjY4NWE3YzIwOTBhNzk0NjdjYTc5NmNlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pwonerpeBYRVG1WlYQUnODKV8JzBkKPB6lMYaQn_mpc',
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((response) => setApiData(response.results || []))
      .catch((err) => console.error(err));

    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`}className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt={card.original_title || "Movie"}
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TitleCards;
