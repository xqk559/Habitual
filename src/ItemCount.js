import React, { Component } from 'react';

class ItemCount extends React.Component {
    constructor (props){
      super ();
    }
    render (){
      return (
        <h4>There are {this.props.count} items on your list</h4>
      );
    }
  }

  export default ItemCount ;