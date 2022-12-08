import {createContext, useContext, useState, useEffect} from "react";
import StudiosContext from "../../Contexts/studios_all";
import StudiosTable from "./Studios_table";

const AllStudioView = () => {
   
    const perPage = 4;
    const [params, setParams] = useState({
        page: 1,  // all pages grabbed from API by default
        perPage: perPage,  // api returns 4 by default
    });

    // const [coords, setCoords] = useState({
    //     latitude:20,
    //     longitude:30
    // });

    const { studios, setStudios } = useContext(StudiosContext);

    // navigator.geolocation.getCurrentPosition(onSuccess);
    
    // function onSuccess(position){
    //     const {
    //         latitude,
    //         longitude
    //     } = position.coords;
    //     setCoords({'latitude': latitude, 'longitude': longitude})
    // }

    useEffect(() => {
        const {page, perPage} = params;
        // send a request to the API to get the payments with that url, a header and a body
        const url = `http://localhost:8000/studios/20/30/all/`
        const config = {
            method: "GET",
            headers:{
                "Content-Type" : "application/json",
            }
        };
        fetch(url, config)
            .then(response => response.json())
            .then(json => {
                setStudios(json['results'])
            })
    }, [params, setStudios]);

    console.log(studios)

    return (
        <>
            <StudiosTable perPage={perPage} params={params} />
            <button onClick={() => setParams({
                ...params,
                page: Math.max(1, params.page - 1)})}> prev 
            </button>
            <button onClick={() => setParams({
                ...params,
                page: params.page + 1})}> next
            </button>
        </>
    )

}

export default AllStudioView;