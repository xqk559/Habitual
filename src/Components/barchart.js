import React, { Component } from 'react'
import * as d3 from 'd3'

class BarChart extends Component {
    componentDidMount() {
        const data = [ 2, 4, 2, 6, 8 ]
        this.drawBarChart(data)
    }
    drawBarChart(data) {
        const canvasHeight = 300
        const canvasWidth = 300
        const scale = 20
        const svgCanvas = d3.select(this.refs.canvas)
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
render() { return <div ref='canvas'></div> }
}
export default BarChart;