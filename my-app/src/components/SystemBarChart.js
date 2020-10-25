import React from "react";
import { HorizontalBar } from "react-chartjs-2";

export default function SystemBarChart(props) {

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
              data: [props.data.posConsumer + props.data.posStock + props.data.posElection, 0, props.data.negConsumer + props.data.negStock + props.data.negElection],
              
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
