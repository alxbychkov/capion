/* eslint-disable no-unused-vars */
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export async function signOperation(txData) {
    const tx = await signer.sendTransaction(txData);
    const txWait = await tx.wait();

    const response = {
        transactionHash: '',
        status: 'sent'
    };

    if (txWait.logs.length) {
        response.transactionHash = txWait.logs[0].transactionHash;
    }

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
    yield* swapWETHToUSDC(object.swapWETHToUSDC);
    yield* sendUSDCToProxy(object);
}

async function* convertEtherToWETH(tx) {
    tx.value = ethers.utils.hexlify(400);
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
    console.log(tx);
    const swapWETHToUSDC = await signOperation(tx);
    yield {message: `Waiting for swapWETHToUSDC transaction txHash: ${swapWETHToUSDC.transactionHash}`};
}

async function* sendUSDCToProxy(tx) {
    const sendUSDCToProxyTx = {from: tx.from, to: tx.to, data: tx.data, nonce: ethers.utils.hexlify(4)};
    yield {message: 'Send USDC to proxy'};
    const sendUSDCToProxy = await signOperation(sendUSDCToProxyTx);
    yield {message: `Waiting for sendUSDCToProxy transaction txHash: ${sendUSDCToProxy.transactionHash}`};
}


