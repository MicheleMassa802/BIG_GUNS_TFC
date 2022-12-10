import { useContext, useEffect, useState } from "react";
import FilteredClassTable from "./StudioFilterTable/SFT";
// import filterContext from the contexts directory
import { FilterContext } from "../../../Contexts/Filter_context";
import "./styles.css";
import Button from "../../Input/button";
import FilteredStudioTable from "./StudioFilterTable/SFT";
// import axios from 'axios';

const FilterStudio = () => {
    const perPage = localStorage.getItem('perPage');
    const [params, setParams] = useState({
        page: 1,  // starts off as 1
        perPage: perPage,  // api returns 8 by default
        token: localStorage.getItem('accessToken'),
        latitude: localStorage.getItem('latitude'),
        longitude: localStorage.getItem('longitude')
    });

    const [next, setNext] = useState(null);

    const { filtered_list, setList } = useContext(FilterContext);

    const [uploadData, setUploadData] = useState({
        // studio_name: "",
        // address: "",
        // lat: "",
        // long: "",
        // postal_code: "",
        // phone: "",
        // amenities: [],
        name: "",
        amenities: "",
        class_name: "",
        coach: "",
    });

    function submitForm(submission) {
        submission.preventDefault();
        console.log("GET ", uploadData);

        // check that if date, initial time, and ending time are not empty then they must all be submitted
        if (uploadData.date !== "" || (uploadData.i_time !== "" || uploadData.e_time !== "")) {
            if (uploadData.date === "" || uploadData.i_time === "" || uploadData.e_time === "") {
                alert("Please fill out all the date, initial time, and ending time fields to use this feature");
                return;
            }
        }
        
        const url = `http://localhost:8000/studios/all/?lat=${params.latitude}&long=${params.longitude}&name=${uploadData.name}&amenities=${uploadData.amenities}&class_name=${uploadData.class_name}&coach=${uploadData.coach}&page=${params.page}`;
        console.log("url", url);
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `${params.token}`,
            },
        };
        
        fetch(url, config)
            .then(res => res.json())
            .then(json => {
                console.log("1", json);
                // using start_time and end_time, fecth the date from the first 10 chars of the string, and the time from the last 8
                const newData = [json['results']]
                setList(newData);
                console.log("all", newData);

                setNext(json['next']);
                return;
            }).catch(err => {
                console.log(err);
            }
        );
        return;
    }

    function submitNext(event, nextB) {
        event.preventDefault();
        var current = params.page;
        if (nextB === true) {
            // console.log("increasing")
            setParams({
            ...params,
            page: next === null ? params.page : params.page + 1})
            current = next === null ? current : current + 1;
                

        } else {
            // console.log("decreasing")
            setParams({
            ...params,
            page: Math.max(1, params.page - 1)})
            current = Math.max(1, current - 1);
        }
        console.log("current");

        // check that if date, initial time, and ending time are not empty then they must all be submitted
        if (uploadData.date !== "" || (uploadData.i_time !== "" || uploadData.e_time !== "")) {
            if (uploadData.date === "" || uploadData.i_time === "" || uploadData.e_time === "") {
                alert("Please fill out all the date, initial time, and ending time fields to use this feature");
                return;
            }
        }
        
        const url = `http://localhost:8000/studios/all/?lat=${params.latitude}&long=${params.longitude}&name=${uploadData.name}&amenities=${uploadData.amenities}&class_name=${uploadData.class_name}&coach=${uploadData.coach}&page=${current}`;
        console.log("url", url);
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `${params.token}`,
            },
        };
        
        fetch(url, config)
            .then(res => res.json())
            .then(json => {
                console.log("1", json);
                // using start_time and end_time, fecth the date from the first 10 chars of the string, and the time from the last 8
                const newData = [json['results']]
                setList(newData);
                console.log("all", newData);

                setNext(json['next']);
                return;
            }).catch(err => {
                console.log(err);
            }
        );
        return;
    }

    // function for storing name
    const handleInput = e => {
        const newData = {...uploadData};
        newData[e.target.name] = e.target.value;
        setUploadData(newData);
        console.log("form: ", newData);
    };

    console.log("HERE", params.page);
    return <div className="outer-container">
        <p> Filter studios using the following parameters: </p>
        <form onSubmit={submitForm}>
            <label> Studio Name: </label>
            <input type="text" name="name" placeholder="Studio" onChange={handleInput}/>
            <label> Class Name: </label>
            <input type="text" name="class_name" placeholder="ClassName" onChange={handleInput}/>
            <label>  Amenities: </label>
            <input type="text" name="amenities" placeholder="Amenities" onChange={handleInput}/>
            <label> Coach: </label>
            <input type="text" name="coach" placeholder="Coach" onChange={handleInput}/>
            <Button label="Submit"/>
        </form>

        <FilteredClassTable perPage={perPage} params={params} listData={filtered_list}/>
        <div className="buttons">
            {/* <form onSubmit={submitNext(false)}>
                <button> prev </button>
            </form>
            <form onSubmit={submitNext(true)}>
                <button> next </button>
            </form> */}
            <button onClick={(event) => submitNext(event, false)}> prev </button>
            <button onClick={(event) => submitNext(event, true)}> next </button>
        </div>
    </div>
}


export default FilterStudio;