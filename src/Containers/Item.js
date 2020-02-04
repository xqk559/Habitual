import React from 'react';

class Item extends React.Component {
    constructor (props){
      super (props);
      this.state = {
        checked: false,
        vitamin: false,
        walk: false,
        program: false,
        vegan: false,
        vegetarian: false,
        exercised: false,
        drink: false,
        smoke: false,
        weight: false,
        music: false,
        art: false
      };
  
      this.handleClick = this.handleClick.bind(this);    
    }

    handleClick (e){

      this.setState({checked: !this.state.checked}, () => console.log(this.state.checked));
      
      this.setState(() => this.props.adder(this.state.checked));

      // console.log(this.state.checked);

      if (this.props.message === "Ate Vitamins") {
        this.setState({vitamin: !this.state.vitamin});
        this.props.status(this.state.vitamin);
        console.log(this.state.vitamin);
      } 
      else if (this.props.message === "Went for a Walk") {
        this.setState({walk: !this.state.walk});
        console.log(this.state.walk);
      }
      else if (this.props.message === "Programming") {
        this.setState({walk: !this.state.program});
        console.log(this.state.program);
      }
      else if (this.props.message === "Did Chores") {
        this.setState({walk: !this.state.walk});
        console.log(this.state.walk);
      }
      else if (this.props.message === "Ate Vegan") {
        this.setState({walk: !this.state.walk});
        console.log(this.state.walk);
      }
      else if (this.props.message === "Ate Vegetarian") {
        this.setState({walk: !this.state.walk});
        console.log(this.state.walk);
      }
      else if (this.props.message === "Exercised") {
        this.setState({walk: !this.state.walk});
        console.log(this.state.walk);
      }
      else if (this.props.message === "Didn't Drink") {
        this.setState({walk: !this.state.walk});
        console.log(this.state.walk);
      }
      else if (this.props.message === "Didn't Smoke") {
        this.setState({walk: !this.state.walk});
        console.log(this.state.walk);
      }
      else if (this.props.message === "Lost Weight") {
        this.setState({walk: !this.state.walk});
        console.log(this.state.walk);
      }
      else if (this.props.message === "Played Music") {
        this.setState({walk: !this.state.walk});
        console.log(this.state.walk);
      }
      else if (this.props.message === "Created Art") {
        this.setState({walk: !this.state.walk});
        console.log(this.state.walk);
      }
      else if (this.props.message === "Meditated") {
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