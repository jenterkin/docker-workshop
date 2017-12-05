import React, { Component } from 'react';
import { requestBalance, requestBuy, requestSell } from './requests';
import Wallet from './components/wallet';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balanceIsFetching: true,
            balance: 0
        };
    }

    componentDidMount = () => this.getBalance()

    updateBalanceAfterRequest(reqeustFunc) {
        reqeustFunc().then(
            resp => this.setState(
                Object.assign({}, this.state, {
                    balance: resp.data.balance
                })
            )
        );
    }

    getBalance = () => this.updateBalanceAfterRequest(requestBalance)
    buy = () => this.updateBalanceAfterRequest(requestBuy)
    sell = () => this.updateBalanceAfterRequest(requestSell)

    render() {
        return (
            <div className="app">
                <Wallet
                    balance={this.state.balance}
                    buy={this.buy}
                    sell={this.sell} />
            </div>
        );
    }
}

export default App;
