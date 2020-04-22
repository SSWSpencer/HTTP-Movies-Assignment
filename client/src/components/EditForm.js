import React, { useState, useEffect } from "react";
import {useParams, useHistory} from "react-router-dom"
import axios from "axios";

const initialMovie = {
    id: 0,
    title: "",
    director: "",
    metascore: 0,
    stars: ""
}

const EditForm = props => {
    const {id} = useParams();
    const {push} = useHistory();
    const {go} = useHistory();
    const [movie, setMovie] = useState(initialMovie);
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res=> {
            setMovie(res.data);
        })
    }, [])

    const handleChanges = e => {
        e.persist();
        let value = e.target.value;
        if(e.target.name === "id" || e.target.name === "metascore"){
            value = parseInt(value, 10);
        }
        if(e.target.name === "stars"){
            value = value.split(",")
        }
        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        push(`/movies/${movie.id}`)
        go(0);
    }

    return(
        <div>
            <h1> Editing Movie </h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                name="title"
                placeholder="Movie Title"
                value={movie.title}
                onChange={handleChanges}
                /><br />
                <input 
                type="text"
                name="director"
                placeholder="Director"
                value={movie.director}
                onChange={handleChanges}
                /> <br />
                <input 
                type="number"
                name="metascore"
                placeholder="Metascore"
                value={movie.metascore}
                onChange={handleChanges}
                /> <br />
                <input 
                type="text"
                name="stars"
                placeholder="Stars"
                value={movie.stars}
                onChange={handleChanges}
                /> <br />
                <button>Save Movie</button>
            </form>
            
        </div>
    )

}

export default EditForm;