import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-bootstrap';

const Home = ({movies}) => {
  const [index, setIndex] = useState(movies[0].id ? movies[0].id : 0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  
  const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
  }
    return (
            <Carousel 
            activeIndex={index} 
            onSelect={handleSelect}
            style={{
              width: "100%",
              background: "#161616",
              color: "white",
              borderRadius: 6,
              position: "relative",
            }}
            className=" movie-card"
            >
                {movies.map((movie) => (
                  <Carousel.Item key={movie.id}>
                    <img
                      className="d-block w-100"
                      src={movie.img}
                      alt={movie.title}
                      style={{ objectFit: 'contain', width: '500px', height: '600px' }}
                    />
                    <Carousel.Caption>
                      <h3>{movie.title}</h3>
                      <p>
                        Release Date: {formatDate(movie.releaseDate)}
                        <br />
                        Actors: {movie.actors.map((actor) => actor.name).join(', ')}
                      </p>
                        <p className="paragraph">Ratings:
                          {movie.ratings.map((rating) => (
                            <FontAwesomeIcon key={rating.id} icon={faStar} className="star" style={{ color: 'gold' }} />
                          ))}
                        </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
    );
};

export default Home;