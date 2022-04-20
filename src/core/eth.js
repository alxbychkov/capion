/* eslint-disable no-unused-vars */
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export async function signOperation(txData) {
    const tx = await signer.sendTransaction(txData);
    const txWait = await tx.wait();
    console.log(txWait);

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
    const tx = await signer.sendTransaction(txData);
    await tx.wait();

    const response = {
        transactionHash: tx.hash,
        status: 'sent'
    };

    return response;
}

export async function* prepareCoins(object) {
    // yield* convertEtherToWETH(object.convertEtherToWETH);
    // yield* approveWETHToUniswapV3Router(object.approveWETHToUniswapV3Router);
    yield* swapWETHToUSDC(object.swapWETHToUSDC);
    yield* sendUSDCToProxy(object);
}

async function* convertEtherToWETH(tx) {
    tx.value = ethers.utils.hexlify(400);
    yield {message: 'Convert ether to WETH'};
    const convertEtherToWETH = await signOperation(tx);
    yield {message: `Waiting for convertEtherToWETH transaction txHash: ${convertEtherToWETH.hash}`};
}

async function* approveWETHToUniswapV3Router(tx) {
    yield {message: 'Approve WETH to UniswapV3 router'};
    const approveWETHToUniswapV3Router = await signOperation(tx);
    yield {message: `Waiting for approveWETHToUniswapV3Router transaction txHash: ${approveWETHToUniswapV3Router.hash}`};
}

async function* swapWETHToUSDC(tx) {
    yield {message: 'Swap WETH to USDC'};
    const swapWETHToUSDC = await signOperation(tx);
    yield {message: `Waiting for swapWETHToUSDC transaction txHash: ${swapWETHToUSDC.hash}`};
}

async function* sendUSDCToProxy(tx) {
    const sendUSDCToProxyTx = {from: tx.from, to: tx.to, data: tx.data};
    yield {message: 'Send USDC to proxy'};
    const sendUSDCToProxy = await signOperation(sendUSDCToProxyTx);
    yield {message: `Waiting for sendUSDCToProxy transaction txHash: ${sendUSDCToProxy.hash}`};
}


