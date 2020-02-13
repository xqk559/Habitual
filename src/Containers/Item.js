import React from 'react';

class Item extends React.Component {
    constructor (props){
      super (props);
      this.state = 
      {
        message: this.props.message,
        checked: false,
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
    }   
    
  render (){
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