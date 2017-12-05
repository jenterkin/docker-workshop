import React from 'react';
import PropTypes from 'prop-types';


function Transaction(props) {
    return <div className="transaction">
        {props.children}
    </div>;
}
Transaction.propTypes = {
    children: PropTypes.any
};


function Buy(props) {
    return <Transaction>
        <button className="buy" onClick={props.onClick}>BUY</button>
    </Transaction>;
}
Buy.propTypes = {
    onClick: PropTypes.func.isRequired
};


function Sell(props) {
    return <Transaction>
        <button className="sell" onClick={props.onClick}>SELL</button>
    </Transaction>;
}
Sell.propTypes = {
    onClick: PropTypes.func.isRequired
};


export { Buy, Sell };
