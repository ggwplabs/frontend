import {AptosClient} from "aptos";
import * as Addr from "./Addresses.js"

export default class WalletService {

    static async getGgwpBalance(wallet) {
        const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1')
        const resources = await client.getAccountResources(wallet.address)
        for (var i = 0; i < resources.length; i++) {
            if (resources[i].type === '0x1::coin::CoinStore<0x' + Addr.COIN_ACCOUNT + '::ggwp::GGWPCoin>') {
                const res = await client.getAccountResource(wallet.address, '0x1::coin::CoinStore<0x' + Addr.COIN_ACCOUNT + '::ggwp::GGWPCoin>')
                return res.data.coin.value / 10**8
            }
        }
        return 0;
    }

}