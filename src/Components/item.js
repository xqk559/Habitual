import React from 'react';

const Item = props => {
    return (
        <div>
          <div className="col-md-12">
            <input type="checkbox" 
                    />
                &nbsp;{props.name}
                <hr className="hr"/>
          </div>
        </div>
    );
}

export default Item;