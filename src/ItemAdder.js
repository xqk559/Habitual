import React from 'react';

class ItemAdder extends React.Component {
    constructor (props){
        super ();
        this.handleClick = this.handleClick.bind(this);   
    }

    handleClick(e){
        var inputVal = document.getElementById("myInput").value;
        this.props.add(inputVal);
    }

    render(){
        return(
            <div>
                <div>New Habit: &nbsp; 
                    <input type="text" 
                           placeholder="Add Habits Here!" 
                           id="myInput"/> &nbsp;
                    <button onClick={this.handleClick}>Submit</button>
                </div>
            </div>
        )
    }
}

export default ItemAdder;