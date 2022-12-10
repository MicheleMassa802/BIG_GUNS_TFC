import { useContext, useEffect, useState } from "react";
import FilteredClassTable from "./ClassFilterTable/CFT";
// import filterContext from the contexts directory
import { FilterContext } from "../../../Contexts/Filter_context";
import "./styles.css";
import Button from "../../Input/button";
import CFT from "./ClassFilterTable/CFT";
// import axios from 'axios';

const FilterClass = () => {
    const perPage = localStorage.getItem('perPage');
    const [params, setParams] = useState({
        page: 1,  // starts off as 1
        perPage: perPage,  // api returns 8 by default
        token: localStorage.getItem('accessToken'),
    });

    const [next, setNext] = useState(null);

    const { filtered_list, setList } = useContext(FilterContext);

    const [uploadData, setUploadData] = useState({
        studio_name: "",
        class_name: "",
        coach: "",
        date: "",
        i_time: "",
        e_time: "",
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
        
        const url = `http://localhost:8000/classes/${uploadData.studio_name}/find_class/?class_name=${uploadData.class_name}&coach=${uploadData.coach}&date=${uploadData.date}&initial_time=${uploadData.i_time}&ending_time=${uploadData.e_time}&page=${params.page}`;
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
                const newData = json['results'].map(data => {
                    return {
                        name: data.name,
                        description: data.description,
                        coach: data.coach,
                        studio: data.studio,
                        date: data.start_time.substring(0, 10),
                        initial_time: data.start_time.substring(11, 19),
                        ending_time: data.end_time.substring(11, 19),
                    }
                });
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
            setParams({
            ...params,
            page: next === null ? params.page : params.page + 1})
            current = next === null ? current : current + 1;
                

        } else {
            setParams({
            ...params,
            page: Math.max(1, params.page - 1)})
            current = Math.max(1, current - 1);
        }

        // check that if date, initial time, and ending time are not empty then they must all be submitted
        if (uploadData.date !== "" || (uploadData.i_time !== "" || uploadData.e_time !== "")) {
            if (uploadData.date === "" || uploadData.i_time === "" || uploadData.e_time === "") {
                alert("Please fill out all the date, initial time, and ending time fields to use this feature");
                return;
            }
        }
        
        const url = `http://localhost:8000/classes/${uploadData.studio_name}/find_class/?class_name=${uploadData.class_name}&coach=${uploadData.coach}&date=${uploadData.date}&initial_time=${uploadData.i_time}&ending_time=${uploadData.e_time}&page=${current}`;
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
                const newData = json['results'].map(data => {
                    return {
                        name: data.name,
                        description: data.description,
                        coach: data.coach,
                        studio: data.studio,
                        date: data.start_time.substring(0, 10),
                        initial_time: data.start_time.substring(11, 19),
                        ending_time: data.end_time.substring(11, 19),
                    }
                });
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
        <p> Filter classes of a studio using the following parameters: </p>
        <form onSubmit={submitForm}>
            <label> Studio Name: </label>
            <input type="text" name="studio_name" placeholder="Studio" required onChange={handleInput}/>
            <label> ClassName: </label>
            <input type="text" name="class_name" placeholder="ClassName" onChange={handleInput}/>
            <label> Coach: </label>
            <input type="text" name="coach" placeholder="Coach" onChange={handleInput}/>
            <label> Date: </label>
            <input type="date" name="date" placeholder="Date" onChange={handleInput}/>
            <label> Initial Time: </label>
            <input type="time" name="i_time" placeholder="Initial Time" onChange={handleInput}/>
            <label> Ending Time: </label>
            <input type="time" name="e_time" placeholder="Ending Time" onChange={handleInput}/>
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


export default FilterClass;