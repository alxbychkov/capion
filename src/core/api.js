import axios from "axios";
import { FLEX_STRATEGY, STRATEGIES } from "./config";

const API_URL = 'http://49.12.97.161:3000';

export async function createStrategy(address) {
    FLEX_STRATEGY.ownerAddress = address;

    try {
        const response = await axios.post(`${API_URL}/strategy`, FLEX_STRATEGY, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (err) {
        console.error('Create strategy: ', err);
    }    
}

export async function preTestSetup(id) {
    try {
        const data = {
            "amount": 100
        };
        const response = await axios.post(`${API_URL}/strategy/pre-test-setup/${id}`, data, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('pre-test-setup', response.data);
        return response.data;
    } catch(err) {
        console.error('Pre test setup failed: ', err);
    }
}

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
    const strategies = [...STRATEGIES];

    // try {
    //     const response = await axios.get(`${API_URL}/strategy`);
    //     const flexStrategy = response.data[0];
    //     strategies.push(        {
    //         id: flexStrategy._id,
    //         name: flexStrategy.name,
    //         isActive: flexStrategy.isActive,
    //         risk_factor: '1/5',
    //         apy: '1.23',
    //         type: 'Cascade',
    //         totalInvestment: 0,
    //         portfolioShare: '100',
    //         config: flexStrategy.config
    //     });
    // } catch(err) {
    //     console.error('Connection failded: ', err);
    // }

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

export async function putStrategy(id, address) {
    try {      
        FLEX_STRATEGY.proxyAddress = address;
        FLEX_STRATEGY.pendingProxy = false;

        const response = await axios.put(`${API_URL}/strategy/${id}`, FLEX_STRATEGY, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });

        console.log('Put strategy', response.data);
        return response.data;
    } catch(err) {
        console.error('putStrategy failed: ', err);
    }
}

export async function firstStrategyDeposit(id, amount) {
    if (!amount || amount === 0) return console.error('Not correct amount value.');
    try {
        const data = {
            "amount": +amount
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


export async function rebalanceShare(id, values) {
    if (!values.aaveShare || !values.sushiShare || !values.uniShare) return console.error('Not correct rebalance values.');
    try {
        const data = {
            "aaveShare": +values.aaveShare,
            "sushiShare": +values.sushiShare,
            "uniShare": +values.uniShare
        };
        const response = await axios.post(`${API_URL}/strategy/rebalance/${id}`, data, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.error('Rebalance share failed: ', err);
    }
}
