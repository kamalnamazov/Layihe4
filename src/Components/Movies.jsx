import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const Movies = () => {
    const [film, setFilm] = useState("Star Wars");
    const [text, setText] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState([]);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?s=${film.split(" ").join("%20")}&apikey=3003361e`)
            .then((res) => res.json())
            .then((data) => {
                if (data.Search) {
                    setText(data.Search);
                } else {
                    setText([]);
                }
            })
            .catch((error) => console.error("Error fetching movies:", error));
    }, [film]);

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem("movieList")) || [];
        const savedStatus = JSON.parse(localStorage.getItem("isSaved")) || false;

        setMovieList(storedList);
        setIsSaved(savedStatus);
    }, []);

    const searchMovies = () => {
        setFilm(searchTerm);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            searchMovies();
        }
    };

    const addToList = (movie) => {
        if (isSaved) {
            alert("There's already a saved list. Clear the list to add new items.");
            return;
        }

        const isAlreadyInList = movieList.some((m) => m.imdbID === movie.imdbID);
        if (isAlreadyInList) {
            alert(`${movie.Title} is already in your list.`);
        } else {
            const updatedList = [...movieList, movie];
            setMovieList(updatedList);
            localStorage.setItem("movieList", JSON.stringify(updatedList));
            alert(`${movie.Title} has been added to your list.`);
        }
    };

    const searchDetails = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <div>
            <nav>
                <h1 className="logoName">YUMORFLIX</h1>
                <div className="div1">
                    <button className="section2">
                        <Link to={"/list"} className="linkText">List</Link>
                    </button>
                </div>
            </nav>
            <div className="div1">
                <input
                    className="inputt"
                    placeholder=" search..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress} 
                />
                <button className="buttonSearch" onClick={searchMovies}>
                    Search
                </button>
            </div>
            <main>
                {text.length > 0 ? (
                    text.map((e) => (
                        <div className="card" key={e.imdbID}>
                            <img src={e.Poster} alt={e.Title} />
                            <p>{e.Title}</p>
                            <span>({e.Year})</span>
                            <button
                                className="button"
                                onClick={() => addToList(e)}
                                disabled={isSaved}
                            >
                                Add to List
                            </button>
                            <button
                                className="button"
                                onClick={() => searchDetails(e.imdbID)}
                            >
                                Details
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </main>
        </div>
    );
};

export default Movies;
