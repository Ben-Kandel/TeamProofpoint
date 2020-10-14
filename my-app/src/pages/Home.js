import React from "react";
import InfoCard from "../components/InfoCard";

//css
import "./Home.css";

class Home extends React.Component{
    render(){
        return(
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Welcome Page</title>
    <link rel="stylesheet" href="welcome.css"/>
    <script src = "jquery-3.3.1.js"></script>
    <script src="welcome.js"></script>
</head>
<body>
    <img src="./images/proofpoint.png" alt="proofpoint logo"/>
<div class = "container" >
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
    <button class = "system">Learn More</button>
</div>

<div id = "box3">  
    <h3>Select a topic</h3>
    
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
        
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
      
        
        <div class="carousel-inner">
          <div class="item active">
            <img src="./images/election2020.png" alt="Los Angeles" width= "500" height = "200px" onclick="changeElection();"/>
          </div>
      
          <div class="item">
            <img src="./images/stockmarket.jpg" alt="Chicago"  width= "500" height = "200px"/>
          </div>
      
          <div class="item">
            <img src="./images/test_pic3.png" alt="New York"  width= "500" height = "200px"/>
          </div>
        </div>
      
        
        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#myCarousel" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right"></span>
          <span class="sr-only">Next</span>
        </a>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </div>
      
</div>
</div>

</body>
</html>

        );
    }
}

export default Home;