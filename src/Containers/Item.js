import React from 'react';

class Item extends React.Component {
    constructor (props){
      super ();
      this.state = {
        checked: false,
        vitamin: false,
        walk: false,
        program: false,
        vegan: false,
        vegetarian: false,
        excercised: false,
        drink: false,
        smoke: false,
        weight: false,
        music: false,
        art: false
      };
  
      this.handleClick = this.handleClick.bind(this);    
    }

    handleClick (e){
      this.setState({checked: !this.state.checked})
      this.props.adder(this.state.checked)
      console.log(this.state.checked);
      if (this.props.message === "Ate Vitamins") {
        this.setState({vitamin: !this.state.vitamin});
        console.log(this.state.vitamin);
      } 
      else if (this.props.message === "Went for a Walk") {
        this.setState({walk: !this.state.walk});
        console.log(this.state.walk);
      }
    
      //ADD MORE ELSE IF OR MAKE DYNAMIC
    }

  render (){
    let text = this.state.checked ? <strike>{this.props.message}</strike> : this.props.message;
    return (
        <div className="row">
          <div className="col-md-12">
            <input type="checkbox" onClick={this.handleClick} />&nbsp;{text}
            <hr />
          </div>
        </div>
    );
  }
}

export default Item ;