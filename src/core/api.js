import axios from "axios";

const API_URL = 'http://49.12.97.161:3000';

export async function getStrategy(id) {
    let strategy = {};

    try {
        const response = await axios.get(`${API_URL}/strategy/${id}`);   
        strategy = response.data;
    } catch (err) {
        console.error('Connection failded: ', err);
    }

    return strategy;
}

export async function getAllStrategies() {
    const strategies = [];

    try {
        const response = await axios.get(`${API_URL}/strategy`);
        const flexStrategy = response.data[0];
        strategies.push(        {
            id: flexStrategy._id,
            name: flexStrategy.name,
            isActive: flexStrategy.isActive,
            risk_factor: '1/5',
            apy: '1.23',
            type: 'Cascade',
            totalInvestment: 0,
            portfolioShare: '100'
        });
    } catch(err) {
        console.error('Connection failded: ', err);
    }

    return strategies;
}

export async function deployStrategy(id) {
    try {
        const response = await axios.post(`${API_URL}/strategy/deployProxy/${id}`);
        
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.error('Deploy failed: ', err);
    }
}

export async function firstStrategyDeposit(id, amount) {
    if (!amount || amount === 0) return console.error('Not correct amount value.');
    try {
        const data = {
            "amount": +amount,
            "debug": true
        };
        const response = await axios.post(`${API_URL}/strategy/deposit/${id}`, data, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.error('First deposit failed: ', err);
    }
}

export async function strategyDeposit(id, amount) {
    if (!amount || amount === 0) return console.error('Not correct amount value.');
    try {
        const data = {
            "amount": amount.toString()
        };
        const response = await axios.post(`${API_URL}/strategy/increase-position/${id}`, data, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.error('Deposit failed: ', err);
    }
}

export async function strategyAllWithdraw(id, amount) {
    if (!amount || amount === 0) return console.error('Not correct amount value.');
    try {
        const data = {
            "swapToUSDC": true,
            "transferToAddress": true
        };
        const response = await axios.post(`${API_URL}/strategy/withdraw/${id}`, data, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.error('Withdraw failed: ', err);
    }
}

export async function strategyWithdraw(id, amount) {
    if (!amount || amount === 0) return console.error('Not correct amount value.');
    try {
        const data = {
            "proportionBPS": amount,
            "swapToUSDC": true,
            "transferToAddress": {}
        };
        const response = await axios.post(`${API_URL}/strategy/decrease-position/${id}`, data, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.error('Withdraw failed: ', err);
    }
}

export async function getChartData() {
    try {
        const response = await axios.get('https://demo-live-data.highcharts.com/aapl-ohlcv.json');
        return response.data;
    } catch (err) {
        console.error('Bad chart data.', err); 
    }
}

