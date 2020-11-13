import { Line } from "react-chartjs-2";
import React from "react";

export default function IndivStockChart(props){

    let fixData = (data) => {
        console.log(data, "i m here")
        return {x: data[0], y: data[1]}


    };



    // console.log('im indiv and I received this in my props:');
    // console.log(props.dow);

    const data = {
        datasets: [
            {
                label: 'Test',
                //data: fixData([new Date(2020, 9, 2), 3348.419922,]), //props.temp
                data: fixData(props),
                fill: false,
                backgroundColor: 'rgba(0, 200, 0)',
                borderColor: 'rgba(0, 200, 0)',
            },

        ],
    };

    const options = {
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Index Closing Values per Day',
        },
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
                    beginAtZero: false,
                }
            }],
        }
    };

    return(
        <div id="index-prices-chart-container">
            <Line data={data} options={options}></Line>
        </div>
    )
};