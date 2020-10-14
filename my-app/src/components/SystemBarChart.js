import React from "react";


import { Bar, HorizontalBar } from "react-chartjs-2";

export default function SystemBarChart() {

    const data = {
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [
          {
              label: "Number of Emails per Sentiment Value (all topics)",
              backgroundColor: ["green", "blue", "red"],
              borderColor: 'rgba(1,1,1,1)', 
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [533, 33, 780],
              
          }
        ]
      };

    const options = {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                }
            }],
            yAxes: [{
                gridLines: {
                    display: true,
                }
            }]
        }
    };

    return(
        <HorizontalBar data={data} options={options} width={1330} height={631}></HorizontalBar>
    )
}
