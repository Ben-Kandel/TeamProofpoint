import { Line } from "react-chartjs-2";
import React from "react";

export function SystemHealthChart1(props){

    console.log('data received asdf:');
    console.log(props.data);

    let fixData = (data) => {
        return data.map(element => {
            return {x: element[0], y: element[1]} 
        });
    };


    const data = {
        datasets: [
            {
                label: 'blah',
                data: fixData(props.data),
                fill: false,
                backgroundColor: 'rgba(0, 0, 255)',
                borderColor: 'rgba(0, 0, 255)',
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        elements: {
            line: {
                tension: 0
            }
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    let number = tooltipItem.yLabel;
                    let label = `${number} emails received`;
                    return label;
                }
            },
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
        <div id="system-health-chart-container">
            <Line data={data} options={options}></Line>
        </div>
    );
}

export function SystemHealthChart2(props){

}