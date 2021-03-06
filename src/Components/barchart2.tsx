import React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";

interface IBarchart2Props {
  selectedItemReducer: any,
}

const BarChart2 = (props: IBarchart2Props) => {
  const drawBarChart = (data: any) => {
    let i = -1;
    const canvasWidth = 300;
    const scale = 10;
    const svgCanvas = d3
      .select(".chart2")
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
        return Object.keys(props.selectedItemReducer[0])[i] + ": " + d;
      })
      .attr("y", (datapoint, iteration) => iteration * 45 + 38)
      .attr("x", (datapoint) => 0);
  };

  if (props.selectedItemReducer[0]) {
    drawBarChart(Object.values(props.selectedItemReducer[0]));
  }

  return (
    <div>
      <div className="headerTextSmall">Total Completed For Selected Days</div>
      <div>
        <div className="chart2"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    selectedItemReducer: state.selectedItemReducer,
  };
};

export default connect(mapStateToProps)(BarChart2);
