import { Line } from "react-chartjs-2";
import React from "react";

export function IndivStockEmailsChart(props){

    //so our data comes in an array of arrays
    //we need to turn that into an array of objects with x:y pairs
    let fixData = (data) => {
        return data.map(element => {
            return {x: element[0], y: element[1]}
        });
    };

    console.log('this is what email data looks like:');
    console.log(props.data);
    // the data for the chart. see https://www.chartjs.org/docs/latest/
    // in this case, the data for each line on the chart will be an array of objects with x and y keys, ie.
    // [{x: Date(2020, 10, 9), y: 30}, {x: Date(2020, 10, 10), y: 25}, ...]
    const data = {
        datasets: [
            {
                data: fixData(props.data),
                fill: false,
                backgroundColor: 'rgba(0, 0, 255)',
                borderColor: 'rgba(0, 0, 255)',
            },

        ],
    };
    
    // the chart options. https://www.chartjs.org/docs/latest/
    const options = {
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Relevant Emails Received per Day',
        },
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
                scaleLabel: {
                  display: true,
                  labelString: 'Date of Emails Received'
                },
                ticks: {
                    beginAtZero: true,
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Emails Received'
                },
            }],
        }
    };

    return(
        <div id="individual-stock-emails-chart-container">
            <Line data={data} options={options}></Line>
        </div>
    )
};

export function IndivStockPricesChart(props){

    let fixData = (data) => {
        return data.map(element => {
            return {x: element.date, y: element.price}
        });
    }

    const data = {
        datasets: [
            {
                label: 'Hello',
                data: fixData(props.data),
                fill: false,
                backgroundColor: 'rgba(255, 0, 0)',
                borderColor: 'rgba(255, 0, 0)',
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0
            }
        },
        title: {
            display: true,
            text: 'Stock Prices per Day',
        },
        legend: {
            display: false,
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    let roundedPrice = tooltipItem.yLabel.toFixed(2);
                    let label = `$${roundedPrice}`;
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
                scaleLabel: {
                  display: true,
                  labelString: 'Date'
                },
                ticks: {
                    beginAtZero: true,
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Price (USD)'
                },
            }],
        }
    };

    return(
        <div id="individual-stock-prices-chart-container">
            <Line data={data} options={options}></Line>
        </div>
    )
};