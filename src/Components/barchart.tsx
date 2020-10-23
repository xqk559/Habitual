import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";

interface IBarchartProps {
  barChartReducer: any
}

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
today = new Date(yyyy, mm, dd);
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export interface IHistoryItems {
  [_: string]: {
    completed: true;
    date: string;
    id: string;
    name: string;
    userId: string;
  }[];
};

let totalDaysDisplay: any;

const BarChart = (props: IBarchartProps) => {
  const [totalDays, setTotalDays] = useState<number | null>(null);
  const [completedDays, setCompletedDays] = useState<number | null>(null);

  const drawBarChart = (data: any) => {
    let i = -1;
    const canvasWidth = 300;
    const scale = 10;
    const svgCanvas = d3
      .select("p")
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", data.length * 55);
    svgCanvas
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", (datapoint: any) => datapoint * scale)
      .attr("height", 20)
      .attr("fill", "purple")
      .attr("y", (datapoint, iteration) => iteration * 45 + 40)
      .attr("x", (datapoint) => 0);
    svgCanvas
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => {
        i++;
        return Object.keys(props.barChartReducer[0])[i] + ": " + d;
      })
      .attr("y", (datapoint, iteration) => iteration * 45 + 38)
      .attr("x", (datapoint) => 0);
  };

  let loader = <p></p>;

  if (!props.barChartReducer[0] && totalDays == null && completedDays == null) {
    loader = <div className="loader">Loading...</div>;
  }

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      axios
        .get(
          "https://habitual-f64a5.firebaseio.com/history" +
            localStorage.getItem("userId") +
            ".json"
        )
        .then((response: AxiosResponse<IHistoryItems>) => {
          if (response.data !== null && response.data !== undefined) {
            const date = Array.from(Object.values(response.data)[0][0].date);
            let year = date.splice(11).join("");
            let monthName = date.splice(4, 3).join("");
            let month = months.indexOf(monthName);
            let day = date.splice(8, 2).join("");
            let startDay = new Date(Number(year), Number(month), Number(day));
            setTotalDays(
              Math.round(
                Math.abs((startDay.getTime() - today.getTime()) / oneDay)
              ) - 29
            );
            setCompletedDays(Object.values(response.data).length);
          }
        });
    }
  }, []);

  if (props.barChartReducer[0] && totalDays != null && completedDays != null) {
    drawBarChart(Object.values(props.barChartReducer[0]));
    totalDaysDisplay = (
      <div className="headerTextSmaller">
        Out of {totalDays} active days, {completedDays} days have data
      </div>
    );
  }

  return (
    <div>
      <div className="headerTextSmall">Total Completed All-Time</div>
      <div>{totalDaysDisplay}</div>
      <div>{loader}</div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    barChartReducer: state.barChartReducer,
  };
};

export default connect(mapStateToProps)(BarChart);