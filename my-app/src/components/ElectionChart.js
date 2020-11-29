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
    // the data for the chart. see https://www.chartjs.org/docs/latest/
    // in this case, the data for each line on the chart will be an array of objects with x and y keys, ie.
    // [{x: Date(2020, 10, 9), y: 30}, {x: Date(2020, 10, 10), y: 25}, ...]
    const data = {
        datasets: [
            {
                label: 'Positive Trump Emails',
                data: fixData(props.pt),
                fill: false,
                backgroundColor: 'rgba(255, 0, 0)',
                borderColor: 'rgba(255, 0, 0)',
                pointRadius: 4,
            },
            {
                label: 'Negative Trump Emails',
                data: fixData(props.nt),
                fill: false,
                backgroundColor: 'rgba(255, 0, 0)',
                borderColor: 'rgba(255, 0, 0)',
                pointRadius: 4,
            },
            {
                label: 'Positive Biden Emails',
                data: fixData(props.pb),
                fill: false,
                backgroundColor: 'rgba(0, 0, 255)',
                borderColor: 'rgba(0, 0, 255)',
                pointRadius: 4,
            },
            {
                label: 'Negative Biden Emails',
                data: fixData(props.nb),
                fill: false,
                backgroundColor: 'rgba(0, 0, 255)',
                borderColor: 'rgba(0, 0, 255)',
                pointRadius: 4,
            },
        ]
    };
    // the chart options. https://www.chartjs.org/docs/latest/
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
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Date of Emails Received'
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Emails Received'
                }
            }],
        }
    };
    // wrap the chart in a div so we can style it with css later
    return(
        <div id="election-chart-container">
            <Line data={data} options={options}></Line>
        </div>
    )
};