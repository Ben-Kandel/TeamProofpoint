import { Line } from "react-chartjs-2";
import React from "react";

export default function ElectionChart(props){

    //so our data comes in an array of arrays
    //we need to turn that into an array of objects with x:y pairs
    let fixData = (data) => {
        return data.map(element => {
            return {x: element[0], y: element[1]} 
        });
    };

    const data = {
        datasets: [
            {
                label: 'Trump Positive',
                data: fixData(props.pt),
                fill: false,
                backgroundColor: 'rgba(255, 0, 0)',
                borderColor: 'rgba(255, 0, 0)',
                pointRadius: 4,
                // pointBorderColor: 'rgba(0,0,0)',
            },
            {
                label: 'Trump Negative',
                data: fixData(props.nt),
                fill: false,
                backgroundColor: 'rgba(255, 0, 0)',
                borderColor: 'rgba(255, 0, 0)',
                pointRadius: 4,
            },
            {
                label: 'Biden Positive',
                data: fixData(props.pb),
                fill: false,
                backgroundColor: 'rgba(0, 0, 255)',
                borderColor: 'rgba(0, 0, 255)',
                pointRadius: 4,
            },
            {
                label: 'Biden Negative',
                data: fixData(props.nb),
                fill: false,
                backgroundColor: 'rgba(0, 0, 255)',
                borderColor: 'rgba(0, 0, 255)',
                pointRadius: 4,
            },
        ]
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'MMM D',
                    }
                },
                ticks: {
                    beginAtZero: true,
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }],
        }
    };
    
    return(
        <div id="election-chart-container">
            <Line data={data} options={options}></Line>
        </div>
    )
};