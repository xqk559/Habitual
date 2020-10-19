import axios from "axios";
import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
today = new Date(yyyy, mm, dd);
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const MONTHS = [
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

let totalDaysDisplay: any;

const BarChart = (props) => {
  const [totalDays, setTotalDays] = useState(null);
  const [completedDays, setCompletedDays] = useState(null);

  const drawBarChart = (data) => {
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
      .attr("width", (datapoint) => datapoint * scale)
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
        .then((response) => {
          if (response.data !== null && response.data !== undefined) {
            const date = Array.from(Object.values(response.data)[0][0].date);
            console.log(date);
            let year = date.splice(11).join("");
            let monthName = date.splice(4, 3).join("");
            let month = MONTHS.indexOf(monthName);
            let day = date.splice(8, 2).join("");
            let startDay = new Date(Number(year), Number(month), Number(day));
            setTotalDays(
              Math.round(
                Math.abs((startDay.getTime() - today.getTime()) / oneDay)
              ) - 29
            );
            setCompletedDays(Object.values(response.data).length);
          }
        })
        .then(() => {
          totalDaysDisplay = (
            <div className="headerTextSmaller">
              Out of {totalDays} active days, {completedDays} days have data
            </div>
          );
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

const mapStateToProps = (state) => {
  return {
    barChartReducer: state.barChartReducer,
  };
};

export default connect(mapStateToProps)(BarChart);