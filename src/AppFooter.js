import React from 'react';

class AppFooter extends React.Component {
    render (){
      return (
        <div className="text-muted">
          <small>&copy; {new Date().getFullYear()}</small>
        </div>
      );
    }
  }

  export default AppFooter;