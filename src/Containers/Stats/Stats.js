import React, {Component} from 'react';
import classes from './Stats.module.css';
import axios from 'axios';

class Stats extends Component {
    state = {
        stats : {},
        map: [],
    }

    UNSAFE_componentWillMount() 
    {
        axios.get('https://habitual-f64a5.firebaseio.com/history.json')
        .then((response) => this.setState({stats: response.data}));
    }

    statUpdater = () => 
    {
        let length = Object.keys(this.state.stats).length -1;
        let keys = Object.keys(this.state.stats);
        let key = keys[length];
        let obj = this.state.stats[key];
        this.setState({map: obj});
        axios.get('https://habitual-f64a5.firebaseio.com/history.json')
                        .then((response) => this.setState({stats: response.data}));
    }

    statMapper = () => 
    {
        let length = Object.keys(this.state.stats).length -1;
        let keys = Object.keys(this.state.stats)
        let key = keys[length];
        let obj = this.state.stats[key];
        console.log(obj);
        if (obj) {
        let result = Object.keys(obj).map((key)=>{
            return [key, obj[key]]
        }) 
        console.log(result);
        let resultLength = result.length - 2;
        return (
            <ul>
                {
                result.map((key, index) => {
                    if (index>1 && key[1]){
                        key[2] = "✓";
                    }
                    return (
                    <li key={key}
                        className="none">
                        { <div>
                            {String(key).replace(","," : ")
                                        .replace("AAAAA","")
                                        .replace("AAAA","")
                                        .replace("true","True")
                                        .replace("false","False")
                            }
                        </div> }
                    </li>
                    );
                })
                }
                <br/>
                <div className={classes.Bold}>
                    {"Completed " +(result[1][1]) + " out of " + (resultLength) + " things!"}
                    <br/>
                </div>
                <div className={classes.Bold}>
                That's {((result[1][1])/(resultLength))*100}% of things!
                </div>
            </ul>
            );
        }
    }

    render() 
    {
        return (
            <div className={classes.Stats}>
                <button onClick={this.statUpdater}>Update Stats</button>
                <br/>
                {this.statMapper()}
            </div>
        );
    }
}

export default Stats;