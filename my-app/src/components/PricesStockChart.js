import { Line } from "react-chartjs-2";
import React from "react";

export default function PricesStockChart(props){

    let fixData = (data) => {
        return data.map(element => {
            return {x: element.date, y: element.price} 
        });
    };

    const data = {
        datasets: [
            {
                label: 'DOW',
                data: fixData(props.dow),
                fill: false,
                backgroundColor: 'rgba(0, 200, 0)',
                borderColor: 'rgba(0, 200, 0)',
            },
            {
                label: 'NASDAQ',
                data: fixData(props.nasdaq),
                fill: false,
                backgroundColor: 'rgba(0, 0, 200)',
                borderColor: 'rgba(0, 0, 200)',
            },
            {
                label: 'S&P 500',
                data: fixData(props.sp500),
                fill: false,
                backgroundColor: 'rgba(200, 0, 0)',
                borderColor: 'rgba(200, 0, 0)',
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