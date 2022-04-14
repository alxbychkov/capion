/* eslint-disable no-unused-vars */
import { ethers } from "ethers";

export async function signOperation(txData, account) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // ethers.utils.getAddress(account);
    const tx = await signer.sendTransaction(txData);
    // const tx = await signer.signTransaction(txData);

    console.log(tx);
    const txWait = await tx.wait();
    return txWait;
    // return tx;
}

