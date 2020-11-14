import React, {Component} from "react";


//css
import "./Home.css";
import Carousel from 'react-bootstrap/Carousel'

import $ from 'jquery';




class Home extends React.Component{

    render(){
        return(

<html lang="en" style={{background: 'white'}}>
<head>
    <meta charset="UTF-8"/>
    <title>Welcome Page</title>
    <link rel="stylesheet" href="Home.css"/>
    <script src = "jquery-3.3.1.js"></script>
    <script src="welcome.js"></script>
</head>
<body style ={{background: 'white'}}>
<img src="./images/proofpoint.png" alt="proofpoint logo"/>
<div class = "container" style ={{background: 'white'}}>
<div id = "box1">
    <h1>Leveraging SPAM to Make Bold Societal Predictions</h1>
    <p>Proofpoint, headquartered in Sunnyvale, California, is a cybersecurity company that provides solutions to top research universities, banks and over half of the Fortune 100 corporations. Proofpoint protects sensitive data across every domain including email, the web, the cloud, social media and mobile messaging.
    </p>
 <p>Proofpoint shields their clients from millions of spam emails per day. By analyzing terabytes of email data, Proofpoint can predict future cyber security attacks and prevent them before they happen, increasing the security and reliability of their system and the web.</p>
</div>

<div id = "box2">
    <h2>Our System</h2>
    <script src="welcome.js"></script>
    <script src = "jquery-3.3.1.js"></script>
    <img src = "./images/SQLite.png" alt = "sqlite" class = "sqlite" width = "200"/>
    <img src = "./images/apachehero.png" alt = "apache" class = "apache" width = "200"/>
    <img src = "./images/django.png" alt = "django" class = "django" width = "200"/>
    <img src = "./images/react.png" alt = "email" class = "email" width = "150"/>
    <img src = "./images/flair.png" alt = "flair" class = "flair" width = "150"/>
    <a class="system" href="/health">Learn More</a>
    <button type="button" class = "runscript" onClick={this.runOnPython}>Update Database</button>
    <a href="/health" class = "system"> Learn More </a>
</div>

<div id = "box3">
    <h3>Select a topic</h3>
    <Carousel class = "carousel">
        <Carousel.Item>
            <img
                className="election"
                src="./images/election2020.png"
                alt="Election"
                width = "500px"
                height = "300px"
                onClick={event=> window.location.href='/election'}
            />

        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src="./images/stockmarket.jpg"
                alt="Third slide"
                width = "400px"
                height = "300px"
                onClick={event=> window.location.href='/stocks'}
            />
        </Carousel.Item>

    </Carousel>

</div>
</div>

</body>
</html>

        );
    }

    runOnPython(){
    $.ajax({
        url: "http://127.0.0.1:8000/transfer",
        headers: {
          'proofpoint': 'proofpoint'
        },
        context: document.body,

    }).done(function() {
        alert('Database has been updated!');
    });

}
}

export default Home;