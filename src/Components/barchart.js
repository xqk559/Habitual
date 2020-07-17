import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux';

const BarChart = props => {

  const drawBarChart = (data) => {
    let i = -1;
    const canvasWidth = 300
    const scale = 10
    const svgCanvas = d3.select('p')
      .append('svg')
      .attr('width', canvasWidth)
      .attr('height', (data.length*55))
    svgCanvas.selectAll('rect')
      .data(data).enter()
      .append('rect')
      .attr('width', (datapoint) => datapoint * scale)
      .attr('height', 20)
      .attr('fill', 'purple')
      .attr('y', (datapoint, iteration) => (iteration * 45) + 40)
      .attr('x', (datapoint) => 0)
    svgCanvas.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => {i++; return Object.keys(props.barChartReducer[0])[i]+": "+d})
      .attr('y', (datapoint, iteration) => (iteration * 45) + 38)
      .attr('x', (datapoint) => 0)
    }

  let loader = <p></p>;

  if(!props.barChartReducer[0]){
    loader = <div class="loader">Loading...</div>
  }

  if(props.barChartReducer[0]){
    drawBarChart(Object.values(props.barChartReducer[0]))
  }

  return (
    <div>
      <div className="headerTextSmall">Total Completed All-Time</div>
      <div className="headerTextSmaller">Out of x active days, y days have data</div>
      <div>
        {loader}
      </div>
      <p></p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    barChartReducer: state.barChartReducer,
  };
};

export default connect(mapStateToProps)(BarChart);