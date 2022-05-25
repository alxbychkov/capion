import axios from "axios";
import { FLEX_STRATEGY, STRATEGIES } from "./config";

const API_URL = 'http://49.12.97.161:3000';

export async function createStrategy(address) {
    FLEX_STRATEGY.ownerAddress = address;

    try {
        const response = await axios.post(`${API_URL}/flex`, FLEX_STRATEGY, {
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

export async function preTestSetup(id, address = '') {
    try {
        const data = {
            "amount": 1000
        };

        const response = await axios.post(`${API_URL}/flex/pre-test-setup/${id}/${data.amount}/${address}`);
    
        return response.data;
    } catch(err) {
        console.error('Pre test setup failed: ', err);
    }
}

export async function getStrategy(id) {
    let strategy = {};

    try {
        const response = await axios.get(`${API_URL}/flex/${id}`);   
        strategy = response.data;
    } catch (err) {
        console.error('Connection failded: ', err);
    }

    return strategy;
}

export async function getUserStrategy(account) {
    let strategies = [];

    try {
        const response = await axios.get(`${API_URL}/flex`);   
        const allStrategies = response.data;

        strategies = allStrategies.filter(s => s.ownerAddress === account);
    } catch (err) {
        console.error('Connection failded: ', err);
    }

    return strategies;
}

export async function getAllStrategies() {
    const strategies = [...STRATEGIES];
    return strategies;
}

export async function deployStrategy(id) {
    try {
        const response = await axios.post(`${API_URL}/flex/proxy/${id}`);
        
        const operationId = await getOperationId(id, 'deployProxy');

        return {
            tx: {...response.data},
            operationId: operationId
        };
    } catch(err) {
        console.error('Deploy failed: ', err);
    }
}

export async function getStrategyProxyAddress(id) {
    try {
        const address = await axios.get(`${API_URL}/flex/proxy/${id}`);
        return address;
    } catch(err) {
        console.error('Can not get proxy address: ', err);
        return false;
    }
}

export async function putStrategy(id, address) {
    try {      
        FLEX_STRATEGY.proxyAddress = address;
        FLEX_STRATEGY.pendingProxy = false;

        const response = await axios.put(`${API_URL}/flex/${id}`, FLEX_STRATEGY, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch(err) {
        console.error('putStrategy failed: ', err);
        return {};
    }
}

export async function putOperation(id, tx, operationId) {
    try {      
        const data = {
            "txStatus": tx.status,
            "txHash": tx.transactionHash
        }

        const response = await axios.put(`${API_URL}/flex/${id}/operation/${operationId}`, data, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch(err) {
        console.error('Put operation failed: ', err);
    }
}

export async function firstStrategyDeposit(id, amount) {
    if (!amount || amount === 0) return console.error('Not correct amount value.');
    try {
        const data = {
            "amount": +amount
        };
        const response = await axios.post(`${API_URL}/flex/deposit/${id}`, data, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });

        const operationId = await getOperationId(id, 'deposit');

        return {
            tx: {...response.data},
            operationId: operationId
        };
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
        const response = await axios.post(`${API_URL}/flex/increase-position/${id}`, data, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        const operationId = await getOperationId(id, 'increasePosition');

        return {
            tx: {...response.data},
            operationId: operationId
        };
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
        const response = await axios.post(`${API_URL}/flex/withdraw/${id}`, data, {
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
            "proportionBPS": +amount,
            "swapToUSDC": true,
            "transferToAddress": true
        };
        const response = await axios.post(`${API_URL}/flex/decrease-position/${id}`, data, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        const operationId = await getOperationId(id, 'decreasePosition');

        return {
            tx: {...response.data},
            operationId: operationId
        };
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
        const response = await axios.post(`${API_URL}/flex/rebalance/${id}`, data, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        const operationId = await getOperationId(id, 'rebalance');

        return {
            tx: {...response.data},
            operationId: operationId
        };
    } catch(err) {
        console.error('Rebalance share failed: ', err);
    }
}


async function getOperationId(id, operationName) {
    const strategy = await getStrategy(id);
    const strategyOperations = strategy.operations.filter(o => (o.action === operationName && o.txStatus === 'pending'));

    return strategyOperations[strategyOperations.length - 1]._id;
}

export async function checkETHBalance(id) {
    try {
        const response = await axios.get(`${API_URL}/flex/personal-balance/${id}`);
    
        return response.data;
    } catch(err) {
        console.error('Personal balance failed: ', err);
        return undefined;
    }
}