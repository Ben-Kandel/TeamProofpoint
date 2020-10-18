import React from "react";
import { Chart } from "react-charts";
import ResizableBox from "./ResizableBox";

export default function MyChart(props) {

  const data = React.useMemo(
    () => [
      {
        label: "Total Emails",
        data: props.data
      },
      {
        label: "fake",
        data: [[new Date(2020, 8, 15), 100]],
      },
    ],
    [props.data]
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "time", position: "bottom"},
      { type: "linear", position: "left"}
    ],
    []
  );


  return(
    <ResizableBox resizable={true} width="1750" height="400">
      <Chart data={data} axes={axes}/>
    </ResizableBox>
  )

}
