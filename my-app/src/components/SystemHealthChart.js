import { Line, HorizontalBar } from "react-chartjs-2";
import React from "react";

export function SystemHealthChart1(props){

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

    const data = {
        labels: ['Positive', 'Negative'],
        datasets: [{            
            backgroundColor: ['rgba(0, 128, 0)', 'rgba(255, 0, 0)'],
            label: 'Number of Emails',
            data: [props.data.posElectionEmails + props.data.posStocksEmails, props.data.negElectionEmails + props.data.negStocksEmails],
        }]
    };

    const options = {
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
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
        <div id="system-health-chart-container-2">
            <HorizontalBar data={data} options={options}/>
        </div>
    );

}