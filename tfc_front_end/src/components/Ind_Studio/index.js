import React from "react";
import {useState, useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import IndStudiosContext from "../../Contexts/Ind_studio";
import ImagesTable from "./Ind_Images_table";
import Text from "../Text";

const StudioDetails = () => {
    const { studioId } = useParams()
    console.log(studioId)

    const perPage = 4;
    const [params, setParams] = useState({
        page: 1,  // all pages grabbed from API by default
        perPage: perPage,  // api returns 4 by default
    });

    const { ind_studio, setIndStudios } = useContext(IndStudiosContext)

    useEffect(() => {
        const url = `http://127.0.0.1:8000/studios/${studioId}/details/`
        const config = {
            method: "GET",
            headers:{
                "Content-Type" : "application/json"
            }
        };
        fetch(url, config)
            .then(response => response.json())
            .then(json => {
                setIndStudios(json)
            })
    }, [setIndStudios]);

    console.log(ind_studio)

    return(
        <>
            <p>{ind_studio.name}</p>
            <p> {ind_studio.address}, {ind_studio.postal_code}</p>
            <p> {ind_studio.phone_number}</p>
            {/* {ind_studio.images.map((img, index) => {return <img key={index} src={"http://localhost:8000" + img.image}>
            </img>}
            )} */}

            {/* <ImagesTable perPage={perPage} params={params} />
                <button onClick={() => setParams({
                    ...params,
                    page: Math.max(1, params.page - 1)})}> prev 
                </button>
                <button onClick={() => setParams({
                    ...params,
                    page: params.page + 1})}> next
                </button> */}
            
        </>
    )
}

export default StudioDetails