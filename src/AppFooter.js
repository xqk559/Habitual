import React from 'react';
import './App.scss';

const AppFooter = () => {
  return (
    <div className="footer">
      <div className="text-muted">
        <small>&copy; {new Date().getFullYear()}</small>
      </div>
    </div>
  );
}

export default AppFooter;