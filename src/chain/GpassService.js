import {AptosClient} from "aptos";
import * as Addr from "./Addresses";


export default class GpassService {

    static async getInfo(wallet) {
        const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1')
        const resources = await client.getAccountResources(Addr.CORE_ACCOUNT)
        const userResources = await client.getAccountResources(wallet.address)
        for (var i = 0; i < userResources.length; i++) {
            if (userResources[i].type === '0x6442c17767e7f2cdb1b931565680dc84ab857c1fc12e68fadc7cec1ab4bfa3::gpass::Wallet') {
                return {
                    amount: userResources[0].data.amount,
                    lastBurned: userResources[0].data.last_burned,
                    burnPeriod: resources[1].data.burn_period
                }
            }
        }
        return {
            amount: 0,
            lastBurned: 0,
            burnPeriod: resources[1].data.burn_period
        }
    }

}