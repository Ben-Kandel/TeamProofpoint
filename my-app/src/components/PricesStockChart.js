import { Line } from "react-chartjs-2";
import React from "react";

export default function PricesStockChart(props){

    let fixData = (data) => {
        return data.map(element => {
            return {x: element.date, y: element.price} 
        });
    };

    const DOW = [
        {
            x: new Date(2020, 9, 2),
            y: 27682.810547,
        },
        {
            x: new Date(2020, 9, 5),
            y: 28148.640625,
        },
        {
            x: new Date(2020, 9, 6),
            y: 27772.759766,
        },
        {
            x: new Date(2020, 9, 7),
            y: 28303.460938,
        },
        {
            x: new Date(2020, 9, 8),
            y: 28425.509766,
        },
        {
            x: new Date(2020, 9, 9),
            y: 28586.900391,
        },
        {
            x: new Date(2020, 9, 12),
            y: 28837.519531,
        }
    ];

    const NASDAQ = [
        {
            x: new Date(2020, 9, 2),
            y: 11075.019531,
        },
        {
            x: new Date(2020, 9, 5),
            y: 11332.490234,
        },
        {
            x: new Date(2020, 9, 6),
            y: 11154.599609,
        },
        {
            x: new Date(2020, 9, 7),
            y: 11364.599609,
        },
        {
            x: new Date(2020, 9, 8),
            y: 11420.980469,
        },
        {
            x: new Date(2020, 9, 9),
            y: 11579.940430,
        },
        {
            x: new Date(2020, 9, 12),
            y: 11876.259766,
        }
    ];

    const SP500 = [
        {
            x: new Date(2020, 9, 2),
            y: 3348.419922,
        },
        {
            x: new Date(2020, 9, 5),
            y: 3408.600098,
        },
        {
            x: new Date(2020, 9, 6),
            y: 3360.969971,
        },
        {
            x: new Date(2020, 9, 7),
            y: 3419.439941,
        },
        {
            x: new Date(2020, 9, 8),
            y: 3446.830078,
        },
        {
            x: new Date(2020, 9, 9),
            y: 3477.139893,
        },
        {
            x: new Date(2020, 9, 12),
            y: 3534.219971,
        }
    ];

    console.log('im pricestockchart and I received this in my props:');
    console.log(props.dow);

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