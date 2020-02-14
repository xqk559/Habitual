import React from 'react';
import '../App.css';

const toolbar = () => {
    return (
        <div>
            <ul className="toolbar">
                <li className="link"><a href="default.asp">
                    Home</a>
                </li>
                <li className="link"><a href="news.asp">
                    Checklist</a>
                </li>
                <li className="link"><a href="contact.asp">
                    Statistics</a>
                </li>
            </ul>
        </div>
    )
}

export default toolbar;