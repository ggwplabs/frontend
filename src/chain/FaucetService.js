import * as Addr from "./Addresses.js"
import {AptosClient} from "aptos";

export default class FaucetService {
    static async airdrop() {
        const client = new AptosClient(Addr.NODE_URL);
        const transaction = {
            type: "entry_function_payload",
            function: '0x' + Addr.FAUCET_ACCOUNT + '::faucet::request',
            arguments: [Addr.FAUCET_ACCOUNT],
            type_arguments: [Addr.GGWP_COIN],
        };
        const tx = await window.aptos.signAndSubmitTransaction(transaction);
        await client.waitForTransaction(tx.hash)
        return tx.hash
    }
}
