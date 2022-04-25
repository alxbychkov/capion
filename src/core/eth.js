/* eslint-disable no-unused-vars */
import { ethers } from "ethers";
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

export async function signDataWithWeb3(account) {
    const accountPromise = web3.eth.getAccounts;
    const accounts = await accountPromise();

    console.log(accounts[0]);
    web3.eth.accounts.sign('Some text', account).then(data => console.log(data));

}

const WETH_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];

const WETH = new web3.eth.Contract(
    WETH_ABI,
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  );


const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export async function signOperation(txData) {
    const tx = await signer.sendTransaction(txData);
    await tx.wait();

    const response = {
        transactionHash: tx.hash,
        status: 'sent'
    };

    return response;
}

export async function sendDeployProxy(txData) {
    txData.nonce = ethers.utils.hexlify(0);
    const tx = await signer.sendTransaction(txData);
    await tx.wait();

    const response = {
        transactionHash: tx.hash,
        status: 'sent'
    };

    return response;
}

export async function* prepareCoins(object) {
    yield* convertEtherToWETH(object.convertEtherToWETH);
    yield* approveWETHToUniswapV3Router(object.approveWETHToUniswapV3Router);
    // const balanceOf = await WETH.methods.balanceOf(object.from).call();
    // console.log(balanceOf);
    yield* swapWETHToUSDC(object.swapWETHToUSDC);
    yield* sendUSDCToProxy(object);
}

async function* convertEtherToWETH(tx) {
    const hexValue = ethers.BigNumber.from(tx.value)._hex;
    tx.value = hexValue;
    tx.nonce = ethers.utils.hexlify(1);
    yield {message: 'Convert ether to WETH'};
    const convertEtherToWETH = await signOperation(tx);
    yield {message: `Waiting for convertEtherToWETH transaction txHash: ${convertEtherToWETH.transactionHash}`};
}

async function* approveWETHToUniswapV3Router(tx) {
    tx.nonce = ethers.utils.hexlify(2);
    yield {message: 'Approve WETH to UniswapV3 router'};
    const approveWETHToUniswapV3Router = await signOperation(tx);
    yield {message: `Waiting for approveWETHToUniswapV3Router transaction txHash: ${approveWETHToUniswapV3Router.transactionHash}`};
}

async function* swapWETHToUSDC(tx) {
    tx.nonce = ethers.utils.hexlify(3);
    yield {message: 'Swap WETH to USDC'};
    const swapWETHToUSDC = await signOperation(tx);
    yield {message: `Waiting for swapWETHToUSDC transaction txHash: ${swapWETHToUSDC.transactionHash}`};
}

async function* sendUSDCToProxy(tx) {
    const sendUSDCToProxyTx = {from: tx.from, to: tx.to, data: tx.data, nonce: ethers.utils.hexlify(4)};
    yield {message: 'Send USDC to proxy'};
    const sendUSDCToProxy = await signOperation(sendUSDCToProxyTx);
    yield {message: `Waiting for sendUSDCToProxy transaction txHash: ${sendUSDCToProxy.transactionHash}`};
}


