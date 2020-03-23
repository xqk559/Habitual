import React from 'react';
import './App.scss';

class AppFooter extends React.Component {
    render (){
      return (
        <div className="footer">
          <div className="text-muted">
            <small>&copy; {new Date().getFullYear()}</small>
          </div>
        </div>
      );
    }
  }

  export default AppFooter;