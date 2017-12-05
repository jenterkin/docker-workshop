import React from 'react';
import PropTypes from 'prop-types';
import { Buy, Sell } from './transactions';


function Wallet(props) {
    return (
        <div className="wallet">
            <div className="header">
                Wallet
            </div>
            <div className="balance">
                <div className="amount">{props.balance}</div>
                <div className="denom">BTC</div>
            </div>
            <div className="footer">
                <div className="footer-actions">
                    <Buy onClick={props.buy} />
                    <Sell onClick={props.sell} />
                </div>
            </div>
        </div>
    );
}
Wallet.propTypes = {
    balance: PropTypes.number.isRequired,
    buy: PropTypes.func.isRequired,
    sell: PropTypes.func.isRequired
};


export default Wallet;
