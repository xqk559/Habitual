import React from 'react';

class ItemCount extends React.Component {
    constructor (props){
      super ();
    }
    render (){
      return (
        <div>There are {this.props.count} items on your list</div>
      );
    }
  }

  export default ItemCount ;