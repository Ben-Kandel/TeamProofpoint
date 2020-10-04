import React from "react";
import {Chart} from "react-charts";
import {Line} from "react-charts";
import {Card} from "react-bootstrap";





export function CustomChart(props){
    const data = React.useMemo(
        () => [
            {
                label: "Series 1",
                data: [[0,1], [1,2], [2,4], [3,2], [4,7]]
            },
            {
                label: "Series 2",
                data: [[0,3], [1,1], [2,5], [3,6], [4,4]]
            }
        ],
        []
    );

    const axes = React.useMemo(
        () => [
            {primary: true, type: "linear", position: "bottom"},
            {type: "linear", position: "left"}
        ],
        []
    );

    const options = {
        maintainAspectRatio: true,
        responsive: false,
    };

    const lineChart = (
        
        // <div style={{width: props.width, height: props.height}}>
        //     <Chart data={data} axes={axes} options={options}></Chart>
        // </div>


       <div style={{display: "flex", flexDirection: "row"}}>
           <Chart data={data} axes={axes}></Chart>
       </div>

    );

    return(
        /*        
        <Card className="text-center" style={{width: props.width, height: props.height}}>
            <Card.Header>Hello!</Card.Header>
            <Card.Body>
                {lineChart}
            </Card.Body>
        </Card>
        */
        <Card title={<div style={{ textAlign: "center" }}>Test Chart</div>}>
            <Card.Body>
                {lineChart}
            </Card.Body>
        </Card>
    );
}
