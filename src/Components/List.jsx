import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const List = () => {
    const [listName, setListName] = useState("My Movie List");
    const [movieList, setMovieList] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem("movieList")) || [];
        const savedStatus = JSON.parse(localStorage.getItem("isSaved")) || false;
        const storedName = localStorage.getItem("listName") || "My Movie List";

        setMovieList(storedList);
        setIsSaved(savedStatus);
        setListName(storedName);
    }, []);

    useEffect(() => {
        localStorage.setItem("movieList", JSON.stringify(movieList));
        localStorage.setItem("isSaved", JSON.stringify(isSaved));
        localStorage.setItem("listName", listName);
    }, [movieList, isSaved, listName]);

    const removeFromList = (id) => {
        const updatedList = movieList.filter((movie) => movie.imdbID !== id);
        setMovieList(updatedList);
    };

    const saveList = () => {
        setIsSaved(true);
        alert("List saved!");
    };

    const clearList = () => {
        if (window.confirm("Are you sure you want to clear the entire list?")) {
            setMovieList([]);
            setIsSaved(false);
            setListName("My Movie List");
            localStorage.removeItem("movieList");
            localStorage.removeItem("isSaved");
            localStorage.removeItem("listName");
        }
    };

    return (
        <div>
            <nav>
                <button className="button" onClick={() => navigate("/")}>
                    Home
                </button>
            </nav>
            <h1>
                {movieList.length > 0 && !isSaved ? ( 
                    <input
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                    />
                ) : (
                    listName
                )}
            </h1>
            <ul>
                {movieList.length > 0 ? (
                    movieList.map((movie) => (
                        <li key={movie.imdbID} className="card">
                            <img src={movie.Poster} alt={movie.Title} />
                            <p>{movie.Title}</p>
                            <span>({movie.Year})</span>
                            {!isSaved && (
                                <button className="button" onClick={() => removeFromList(movie.imdbID)}>
                                    Remove
                                </button>
                            )}
                        </li>
                    ))
                ) : (
                    <p>Your list is empty.</p>
                )}
            </ul>
            {movieList.length > 0 && ( 
                <div>
                    {!isSaved && (
                        <button className="button" onClick={saveList}>
                            Save List
                        </button>
                    )}
                    <button className="button" onClick={clearList}>
                        Clear List
                    </button>
                </div>
            )}
        </div>
    );
};

export default List;
