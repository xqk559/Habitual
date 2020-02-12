import React from 'react';

class Item extends React.Component {
    constructor (props){
      super (props);
      this.state = 
      {
        // newValue: null,
        message: this.props.message,
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
        meditate: false,
      };
  
      this.handleClick = this.handleClick.bind(this);    
    }

    UNSAFE_componentWillMount() {
      this.props.booler(this.state.checked);
      this.props.messager(this.state.message);
      console.log(this.state.checked);
    }

    handleClick (e)
    {
      this.props.messager(this.state.message);
      this.setState({checked: !this.state.checked}, () => this.props.adder(this.state.checked));
      this.setState({}, () => this.props.booler(this.state.checked));
      console.log(this.state.checked);
      const strings = 
      {
        "Vitamins":        'vitamin',
        "Went for a Walk": 'walk',
        "Programming":     'program',
        "Did Chores":      'chore',
        "Ate Vegan":       'vegan',
        "Ate Vegetarian":  'vegetarian',
        "Exercised":       'exercised',
        "Didn't Drink":    'drink',
        "Didn't Smoke":    'smoke',
        "Lost Weight":     'weight',
        "Played Music":    'music',
        "Created Art":     'art',
        "Meditated":       'meditate',
      };
      if (this.props.status) 
        {
          this.setState({walk: !this.state[strings[this.props.message]]});
          this.props.status(this.state[strings[this.props.message]]);
        }
    }   
  render (){
   
   
    // this.props.booler(this.state.checked);
    // this.props.messager(this.state.message);
   
   
    let text = this.state.checked ? <strike>{this.props.message}</strike> : this.props.message;
    return (
        <div>
          <div className="col-md-12">
            <input type="checkbox" 
                   onClick={this.handleClick} />
                &nbsp;{text}
                <hr className="hr"/>
          </div>
        </div>
    );
  }
}

export default Item ;