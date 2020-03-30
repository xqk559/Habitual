import React, {useEffect, useState} from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux';

const BarChart = props => {

  const [pairs, setPairs] = useState()

  useEffect(()=>{
    if(props.barChartReducer[0]){
      setPairs(props.barChartReducer[0])
      drawBarChart(Object.values(props.barChartReducer[0]))
    }
  }, [props])

  let data = [ 2, 4, 2, 6, 8 ]

  const drawBarChart = (data) => {
      const canvasHeight = 300
      const canvasWidth = 300
      const scale = 20
      const svgCanvas = d3.select('p')
        .append('svg')
        .attr('width', canvasWidth)
        .attr('height', canvasHeight)
        .style('border', '1px solid black')
      svgCanvas.selectAll('rect')
        .data(data).enter()
        .append('rect')
        .attr('width', 40)
        .attr('height', (datapoint) => datapoint * scale)
        .attr('fill', 'purple')
        .attr('x', (datapoint, iteration) => iteration * 45)
        .attr('y', (datapoint) => canvasHeight - datapoint * scale)
      svgCanvas.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text((d) => d)
        .attr('x', (datapoint, iteration) => iteration * 45)
        .attr('y', (datapoint) => canvasHeight - datapoint * scale)
      }
  return <div><p></p></div>
}

const mapStateToProps = state => {
  return {
    barChartReducer: state.barChartReducer,
  };
};

export default connect(mapStateToProps)(BarChart);