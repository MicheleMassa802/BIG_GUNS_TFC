import React from 'react'
import "./style.css"
import landing1 from "./landing1.jpg"
import landing2 from "./landing2.jpg"
import landing3 from "./landing3.jpg"

const Landing = () => {
  return (
    <div className='container'>
        <div className='grid'>
            <img src={landing1} alt=''/>
            <h1>Welcome to TFC! A globally recognized fitness club with state of the art facilities spread throughout the world!</h1>
        </div>
        <div className='grid'>
            <h1>
            Each of our world class studios host classes at different times so pick a time slot that suits you and get started on your fitness journey with us
            </h1>
            <img src={landing2} alt=''/>
        </div>
        <div className='grid'>
            <img src={landing3} alt=''/>
            <h1>
            All of our clubs are not only equipped with the best facilities but also have leading instructors to guide you through your journey and monitor your progress
            </h1>
        </div>
    </div>
  )
}

export default Landing;