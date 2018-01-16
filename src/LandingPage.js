import React from 'react'
import { Image } from 'react-bootstrap'
import './LandingPage.css'

const LandingPage = () => (
  <div className="profile">
    <Image src={require('./assests/ClarkAaron_sq_bw.png')} circle responsive />
    <h1>Hi, I'm Aaron</h1>
    <p>
      Software Development Engineer in Test (SDET) & technology hobbiest <br />
      I created this site to learn <a href="https://reactjs.org/">React</a> and <a href="https://aws.amazon.com/websites/">AWS S3 hosting</a>
    </p>
  </div>
)

export default LandingPage
