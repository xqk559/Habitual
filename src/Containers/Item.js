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
        art: false,
        chore: false,
        meditate: false
      };
  
      this.handleClick = this.handleClick.bind(this);    
    }

    handleClick (e){

      this.setState({checked: !this.state.checked}, () => console.log("Checked: " + this.state.checked));
      
      this.setState(() => this.props.adder(this.state.checked));

      // console.log(this.state.checked);

      if (this.props.message === "Ate Vitamins") {
        this.setState({vitamin: !this.state.vitamin}, () => console.log("Vitamin: " + this.state.vitamin));
        this.props.status(this.state.vitamin);
        console.log(this.state.vitamin);
      } 
      else if (this.props.message === "Went for a Walk") {
        this.setState({walk: !this.state.walk});
        this.props.status(this.state.walk);
      }
      else if (this.props.message === "Programming") {
        this.setState({walk: !this.state.program});
        this.props.status(this.state.program);
      }
      else if (this.props.message === "Did Chores") {
        this.setState({walk: !this.state.chore});
        this.props.status(this.state.chore);
      }
      else if (this.props.message === "Ate Vegan") {
        this.setState({walk: !this.state.vegan});
        this.props.status(this.state.vegan);
      }
      else if (this.props.message === "Ate Vegetarian") {
        this.setState({walk: !this.state.vegetarian});
        this.props.status(this.state.vegetarian);
      }
      else if (this.props.message === "Exercised") {
        this.setState({walk: !this.state.exercised});
        this.props.status(this.state.exercised);
      }
      else if (this.props.message === "Didn't Drink") {
        this.setState({walk: !this.state.drink});
        this.props.status(this.state.drink);
      }
      else if (this.props.message === "Didn't Smoke") {
        this.setState({walk: !this.state.smoke});
        this.props.status(this.state.smoke);
      }
      else if (this.props.message === "Lost Weight") {
        this.setState({walk: !this.state.weight});
        this.props.status(this.state.weight);
      }
      else if (this.props.message === "Played Music") {
        this.setState({walk: !this.state.music});
        this.props.status(this.state.music);
      }
      else if (this.props.message === "Created Art") {
        this.setState({walk: !this.state.art});
        this.props.status(this.state.art);
      }
      else if (this.props.message === "Meditated") {
        this.setState({walk: !this.state.meditate});
        this.props.status(this.state.meditate);
      }
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