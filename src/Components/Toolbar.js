import React from 'react';
import '../App.css';

const toolbar = () => {
    return (
        <div>
            <ul className="toolbar">
                <li className="link"><a href="home.asp">
                    Home</a>
                </li>
                <li className="link"><a href="checklist.asp">
                    Checklist</a>
                </li>
                <li className="link"><a href="stats.asp">
                    Statistics</a>
                </li>
                <li className="rightLink"><a href="login.asp">
                    Login</a>
                </li>
            </ul>
        </div>
    )
}

export default toolbar;