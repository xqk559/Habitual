import React, {Component} from 'react';
import classes from './Stats.module.css';
import axios from 'axios';

class Stats extends Component {
    state = {
        stats : {},
        map: [1],
    }

    UNSAFE_componentWillMount() 
    {
        axios.get('https://habitual-f64a5.firebaseio.com/history.json')
        .then((response) => this.setState({stats: response.data}));
    }

    statUpdater = () => 
    {
        let keys = Object.keys(this.state.stats)
        let key = keys[1];
        let obj = this.state.stats[key];
        this.setState({map: obj});
        axios.get('https://habitual-f64a5.firebaseio.com/history.json')
                        .then((response) => this.setState({stats: response.data}));
    }

    statMapper = () => 
    {
        let keys = Object.keys(this.state.stats)
        let key = keys[0];
        let obj = this.state.stats[key];
        if (obj) {
        let result = Object.keys(obj).map((key)=>{
            return [key, obj[key]]
        }) 
        console.log(result);
        return (
            <ul>
                {
                result.map((val, index) => {
                    return (
                    <li key={index}
                        className="none">
                        { <div>
                            {val}{index}
                        </div> }
                    </li>
                    );
                })
                }
            </ul>
            );
        }
    }

    render() 
    {
        return (
            <div className={classes.Stats}>
                <button onClick={this.statUpdater}>Update Stats</button>
                {this.statMapper()}
            </div>
        );
    }
}

export default Stats;