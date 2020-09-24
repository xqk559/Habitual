import axios from 'axios';
import React, {useEffect, useState} from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux';

let today = new Date();
let dd = String(today.getDate());
let mm = String(today.getMonth() + 1); //January is 0!
let yyyy = today.getFullYear();
today = new Date(yyyy, mm, dd);
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

let totalDaysDisplay;

const BarChart = props => {
  const [totalDays, setTotalDays] = useState(null);
  const [completedDays, setCompletedDays] = useState(null);

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

  if(!props.barChartReducer[0] && totalDays == null && completedDays == null){
    loader = <div className="loader">Loading...</div>
  }

  useEffect(()=>{
    if(localStorage.getItem('userId')){
      axios.get('https://habitual-f64a5.firebaseio.com/history'+localStorage.getItem('userId')+'.json')
        .then((response)=> {if(response.data !== null && response.data !== undefined ){
          let year = Array.from(Object.values(response.data)[0][0].date).splice(11).join("");
          let monthName = Array.from(Object.values(response.data)[0][0].date).splice(4,3).join("");
          let month;
          if(monthName === "Jan"){
            month = 0
          } else if(monthName === "Feb"){
            month = 1
          }
          else if(monthName === "Mar"){
            month = 2
          }
          else if(monthName === "Apr"){
            month = 3
          }
          else if(monthName === "May"){
            month = 4
          }
          else if(monthName === "Jun"){
            month = 5
          }
          else if(monthName === "Jul"){
            month = 6
          }
          else if(monthName === "Aug"){
            month = 7
          }
          else if(monthName === "Sep"){
            month = 8
          }
          else if(monthName === "Oct"){
            month = 9
          }
          else if(monthName === "Nov"){
            month = 10
          }
          else if(monthName === "Dec"){
            month = 11
          }
          let day = Array.from(Object.values(response.data)[0][0].date).splice(8,2).join("");
          let startDay = new Date(year, month, day)
          setTotalDays(Math.round(Math.abs((startDay - today) / oneDay)));
          setCompletedDays(Object.values(response.data).length);
        }})
        .then(()=>{
          totalDaysDisplay = <div className="headerTextSmaller">Out of {totalDays} active days, {completedDays} days have data</div>;
        }
      )
  }}, []) // eslint-disable-line react-hooks/exhaustive-deps

  if(props.barChartReducer[0] && totalDays != null && completedDays != null){
    drawBarChart(Object.values(props.barChartReducer[0]))
    totalDaysDisplay = <div className="headerTextSmaller">Out of {totalDays} active days, {completedDays} days have data</div>;
  }

  return (
    <div>
      <div className="headerTextSmall">Total Completed All-Time</div>
      <div>{totalDaysDisplay}</div>
      <div>
        {loader}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    barChartReducer: state.barChartReducer,
  };
};

export default connect(mapStateToProps)(BarChart);