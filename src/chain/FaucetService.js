import * as Addr from "./Addresses.js"

export default class FaucetService {
    static async airdrop() {
        const transaction = {
            type: "entry_function_payload",
            function: '0x' + Addr.FAUCET_ACCOUNT + '::faucet::request',
            arguments: [Addr.FAUCET_ACCOUNT],
            type_arguments: [Addr.GGWP_COIN],
        };
        await window.aptos.signAndSubmitTransaction(transaction);
    }
}
