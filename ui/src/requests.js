import axios from 'axios';


const API_BASE = 'http://localhost:8080/api'
const ROUTES = {
    buy: API_BASE + '/buy',
    sell: API_BASE + '/sell',
    balance: API_BASE + '/balance'
};


const callApi = route => axios.get(route);
const requestBalance = () => callApi(ROUTES.balance);
const requestBuy = () => callApi(ROUTES.buy);
const requestSell = () => callApi(ROUTES.sell);

export {
    requestBalance,
    requestBuy,
    requestSell
};
