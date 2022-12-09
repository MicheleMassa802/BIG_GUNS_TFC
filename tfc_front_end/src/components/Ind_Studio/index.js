import React from "react";
import {useState, useContext} from "react";
import {useParams} from "react-router-dom";
import IndStudiosContext from "../../Contexts/Ind_studio";

const StudioDetails = () => {
    const {name} = useParams()

    const { setIndStudios } = useContext(IndStudiosContext)

    useEffect(() => {\
        const{name} = name
        const url = `http://127.0.0.1:8000/studios/${name}/details/`
        const config = {
            method: "GET"
            headers:{
                "Content-Type" : "application/json",
            }
        };
        fetch(url, config)
            .then(response => response.json())
            .then(json => {
                setIndStudios(json)
            })
    }, [setIndStudios]);

    console.log(ind_studios)

    return(
        <>
        <h1>{ind_studios.name}</h1>
        
        </>
    )


}