import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Details = () => {
    const { id } = useParams();
    const [datas, setDatas] = useState(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=3003361e`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then((data) => {
                setDatas(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [id]);

    if (datas && datas.Response === "False") {
        return <div>Movie details not found</div>;
    }

    return (
        <div className="detailSection">
            {datas && datas.Poster && (
                <div>
                    <img src={datas.Poster} alt={datas.Title} />
                    <h2>Title: {datas.Title}</h2>
                    <p>Actors: {datas.Actors}</p>
                    <p>Released: {datas.Released}</p>
                    <button className="detailsButton">
                        <Link
                            to={`https://www.imdb.com/title/${id}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="detailsLink"
                        >
                            Details
                        </Link>
                    </button>
                    <button className="detailsButton">
                        <Link to={"/"} className="detailsLink"> Back </Link>
                        
                    </button>
                </div>
            )}
        </div>
    );
};

export default Details;
