/* eslint-disable no-unused-vars */
import { ethers } from "ethers";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();



export async function signOperation(txData) {
    const tx = await signer.sendTransaction(txData);
    console.log(tx);
    const txWait = await tx.wait();
    console.log(txWait);

    const response = {
        transactionHash: '',
        status: ''
    };

    if (txWait.logs.length) {
        response.transactionHash = txWait.logs[0].transactionHash;
        response.status = txWait.status.toString();
    }

    return response;
}

function byte32toString(value) {
    // return ethers.utils.parseBytes32String(value);
    const valueLength = value.length;

    if (value[0] !== 0 && value[1] !== 'x') {
        console.log('Invalid address');
        return '';
    }
    
    if (valueLength === 42) {
        return value;
    }

    if (valueLength > 42) {
        return `0x${value.slice(valueLength - 40)}`;
    }
}

function decodeLog(hexString, topics) {
    const inputs = [
        {
            type: "address",
            name: "owner"
        },
        {
            type: "address",
            name: "proxyAddress"
        }
    ];
    return web3.eth.abi.decodeLog(inputs, hexString, topics)
}

function decodeInt(hexString, topics) {
    const abi = [
        // Constructor
        "constructor(string symbol, string name)",
      
        // State mutating method
        "function transferFrom(address from, address to, uint amount)",
      
        // State mutating method, which is payable
        "function mint(uint amount) payable",
      
        // Constant method (i.e. "view" or "pure")
        "function balanceOf(address owner) view returns (uint)",
      
        // An Event
        "event Transfer(address indexed from, address indexed to, uint256 amount)",
      
        // A Custom Solidity Error
        "error AccountLocked(address owner, uint256 balance)",
      
        // Examples with structured types
        "function addUser(tuple(string name, address addr) user) returns (uint id)",
        "function addUsers(tuple(string name, address addr)[] user) returns (uint[] id)",
        "function getUser(uint id) view returns (tuple(string name, address addr) user)"
      ];
    const iface = new ethers.utils.Interface(abi);

    return iface.decodeEventLog("Transfer", hexString, topics);
}

export async function sendDeployProxy(txData) {
    const tx = await signer.sendTransaction(txData);
    const txWait = await tx.wait();

    const response = {
        transactionHash: '',
        status: 'sent'
    };

    console.log('sendDeployProxy', tx);

    if (txWait.logs.length) {
        response.transactionHash = txWait.logs[0].transactionHash;
    }

    return response;
}