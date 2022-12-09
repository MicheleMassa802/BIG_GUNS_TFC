import {createContext, useContext, useState, useEffect} from "react";
import StudiosContext from "../../Contexts/studios_all";
import StudiosTable from "./Studios_table";

const AllStudioView = () => {

    navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          localStorage.setItem('latitude', pos.lat);
          localStorage.setItem('longitude', pos.lng);
        }
    );

    const perPage = 4;
    const [params, setParams] = useState({
        page: 1,  // all pages grabbed from API by default
        perPage: perPage,  // api returns 4 by default
        lat: localStorage.getItem('latitude'),
        long: localStorage.getItem('longitude')
    });

    const [next, setNext] = useState(null);

    const { setStudios } = useContext(StudiosContext);

    useEffect(() => {
        const {page, perPage, lat, long} = params;
        // send a request to the API to get the payments with that url, a header and a body
        const url = `http://127.0.0.1:8000/studios/all/?lat=${lat}&long=${long}&page=${page}`
        const config = {
            method: "GET",
            headers:{
                "Content-Type" : "application/json",
            }
        };
        fetch(url, config)
            .then(response => response.json())
            .then(json => {
                setStudios(json.results)
                setNext(json.next)
            })
    }, [params, setStudios]);
    
    return (
            <>
                <StudiosTable perPage={perPage} params={params} />
                <button onClick={() => setParams({
                    ...params,
                    page: Math.max(1, params.page - 1)})}> prev 
                </button>
                <button onClick={() => setParams({
                    ...params,
                    page: next === null ? params.page : params.page + 1})}> next
                </button>
            </>
        )
}

export default AllStudioView;