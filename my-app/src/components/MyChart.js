import React from "react";
import { Chart } from "react-charts";
import useDemoConfig from "./useDemoConfig";
import ResizableBox from "./ResizableBox";

export default function MyChart() {

  const data = React.useMemo(
    () => [
      {
        label: "Total Emails",
        data: [[new Date(2020, 8, 10), 100], [new Date(2020, 8, 13), 540], [new Date(2020, 8, 25),260], [new Date(2020, 9, 10),448]],
      },
      {
        label: "Election Emails",
        data: [[new Date(2020, 8, 10), 50], [new Date(2020, 8, 13), 150], [new Date(2020, 8, 25), 200], [new Date(2020, 9, 10), 250]]
      },
      {
        label: "nothing",
        data: []
      },
      {
        label: "Stock Market Emails",
        data: [[new Date(2020, 8, 10), 50], [new Date(2020, 8, 13), 390], [new Date(2020, 8, 25), 60], [new Date(2020, 9, 10), 198]]
      }
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "time", position: "bottom"},
      {type: "linear", position: "left"}
    ],
    []
  );


  return(
    <ResizableBox resizable={true} width="1750" height="400">
      <Chart data={data} axes={axes}/>
    </ResizableBox>
  )

}
