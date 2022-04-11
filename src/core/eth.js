import { ethers } from "ethers";

export async function signOperation(txData, account) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(account);
    const tx = await signer.sendTransaction(txData);
    console.log(tx);
    return tx;
}