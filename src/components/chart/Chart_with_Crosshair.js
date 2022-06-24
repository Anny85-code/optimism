import React, { Component } from "react";
import CanvasJSReact from "../../assets/charts_assets/canvasjs.react";
import "./Chart.css";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class ChartWithCrosshair extends Component {
  render() {
    const options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Transaction Stats",
      },
      axisX: {
        valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },
      },
      axisY: {
        title: "Closing Price (in NGN)",
        includeZero: false,
        valueFormatString: "N##0.00",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          labelFormatter: function (e) {
            return "N" + CanvasJS.formatNumber(e.value, "##0.00");
          },
        },
      },
      data: [
        {
          type: "area",
          xValueFormatString: "DD MMM",
          yValueFormatString: "N##0.00",
          dataPoints: [
            { x: new Date("2018-03-01"), y: 85.3 },
            { x: new Date("2018-03-02"), y: 83.97 },
            { x: new Date("2018-03-05"), y: 83.49 },
            { x: new Date("2018-03-06"), y: 84.16 },
            { x: new Date("2018-03-07"), y: 84.86 },
            { x: new Date("2018-03-08"), y: 84.97 },
            { x: new Date("2018-03-09"), y: 85.13 },
            { x: new Date("2018-03-12"), y: 85.71 },
            { x: new Date("2018-03-13"), y: 84.63 },
            { x: new Date("2018-03-14"), y: 84.17 },
            { x: new Date("2018-03-15"), y: 85.12 },
            { x: new Date("2018-03-16"), y: 85.86 },
            { x: new Date("2018-03-19"), y: 85.17 },
            { x: new Date("2018-03-20"), y: 85.99 },
            { x: new Date("2018-03-21"), y: 86.1 },
            { x: new Date("2018-03-22"), y: 85.33 },
            { x: new Date("2018-03-23"), y: 84.18 },
            { x: new Date("2018-03-26"), y: 85.21 },
            { x: new Date("2018-03-27"), y: 85.81 },
            { x: new Date("2018-03-28"), y: 85.56 },
            { x: new Date("2018-03-29"), y: 88.15 },
          ],
        },
      ],
    };
    return (
      <div className="ChartWithCrosshair">
        <CanvasJSChart
          options={options}
          onRef={(ref) => (this.ChartWithCrosshair = ref)}
        />
      </div>
    );
  }
}

export default ChartWithCrosshair;
