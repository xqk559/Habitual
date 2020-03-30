import React from "react"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"
import { CirclePicker } from "react-color"
import "./calendar.css"
import { serializeDates, deserializeDates } from "./storage"

const pickableColors = [
  "#4A90E2",
  "#e91e63",
  "#ff9800",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#009688",
  "#795548",
]

const monday = 1

class Calendar extends React.Component {

  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.toggleMute = this.toggleMute.bind(this)
    this.changeColor = this.changeColor.bind(this)
    this.hideColorPicker = this.hideColorPicker.bind(this)

    const storedDays = localStorage.getItem("selectedDays")
    const storedMuted = localStorage.getItem("muted")
    const storedColor = localStorage.getItem("selectedColor")

    this.state = {
      selectedDays: deserializeDates(storedDays),
      muted: JSON.parse(storedMuted) || false,
      showColorPicker: false,
      selectedColor: storedColor || "#9c27b0",
      lastDaySelected: null,
    }
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state
    if (selected) {
      const lastSelectedDay = selectedDays[selectedDays.length - 1]
      if (DateUtils.isSameDay(lastSelectedDay, day)) {
      }

      const ind = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      )
      selectedDays.splice(ind, 1)
    } else {
      selectedDays.push(day)
    }

    localStorage.setItem("selectedDays", serializeDates(selectedDays))
    this.setState({ selectedDays })
    this.setState({lastDaySelected: day})
  }

  toggleMute() {
    const toggled = !this.state.muted
    this.setState({ muted: toggled })
    localStorage.setItem("muted", JSON.stringify(toggled))
  }

  changeColor(color, event) {
    this.setState({ selectedColor: color.hex, showColorPicker: false })
    localStorage.setItem("selectedColor", color.hex)
  }

  hideColorPicker(event) {
    if (this.state.showColorPicker) {
      this.setState({ showColorPicker: false })
    }
  }

  render() {
    return (
      <div className="container" onClick={this.hideColorPicker}>
        <div className="App">
          <DayPicker
            onDayClick={this.handleDayClick}
            modifiers={{ selected: this.state.selectedDays }}
            modifiersStyles={{
              selected: { backgroundColor: this.state.selectedColor },
            }}
            firstDayOfWeek={monday}
          />
          <div className="settings">
            {!this.state.showColorPicker && (
              <button
                style={{ backgroundColor: this.state.selectedColor }}
                onClick={() => this.setState({ showColorPicker: true })}
                className="picker-toggler"
              ></button>
            )}

            {this.state.showColorPicker && (
              <div className="color-picker">
                <CirclePicker
                  colors={pickableColors}
                  circleSize={20}
                  circleSpacing={5}
                  onChangeComplete={this.changeColor}
                  width="200px"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar;
