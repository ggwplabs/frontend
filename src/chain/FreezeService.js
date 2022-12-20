import {AptosClient} from "aptos";
import * as Addr from "./Addresses";

export default class FreezeService {
    static async freezing(amount) {

        const client = new AptosClient(Addr.NODE_URL)
        const transaction = {
            type: "entry_function_payload",
            function: '0x' + Addr.CORE_ACCOUNT + '::gpass::freeze_tokens',
            arguments: [Addr.CORE_ACCOUNT, amount * 10 ** 8],
            type_arguments: [],
        };
        const tx = await window.aptos.signAndSubmitTransaction(transaction);
        await client.waitForTransaction(tx.hash)
        return tx.hash
    }

    static async getInfo(wallet) {
        const client = new AptosClient(Addr.NODE_URL)
        const resources = await client.getAccountResources(Addr.CORE_ACCOUNT)
        const userResources = await client.getAccountResources(wallet.address)
        console.log(resources)
        for (var i = 0; i < userResources.length; i++) {
            if (userResources[i].type === '0x6442c17767e7f2cdb1b931565680dc84ab857c1fc12e68fadc7cec1ab4bfa3::gpass::UserInfo') {
                return {
                    amount: userResources[1].data.freezed_amount / 10 ** 8,
                    lastGettingGpass: userResources[1].data.last_getting_gpass,
                    rewardPeriod: resources[2].data.reward_period
                }
            }
        }

        return {
            amount: 0,
            lastGettingGpass: 0,
            rewardPeriod: resources[2].data.reward_period
        }
    }

    static async withdrawGpass(network, userAccount) {
        const client = new AptosClient(Addr.NODE_URL)
        const transaction = {
            type: "entry_function_payload",
            function: '0x' + Addr.CORE_ACCOUNT + '::gpass::withdraw_gpass',
            arguments: [Addr.CORE_ACCOUNT],
            type_arguments: [],
        };
        const tx = await window.aptos.signAndSubmitTransaction(transaction);
        await client.waitForTransaction(tx.hash)
        return tx.hash
    }

    static async unfreeze(network, userAccount) {
        const client = new AptosClient(Addr.NODE_URL)
        const transaction = {
            type: "entry_function_payload",
            function: '0x' + Addr.CORE_ACCOUNT + '::gpass::unfreeze',
            arguments: [Addr.CORE_ACCOUNT],
            type_arguments: [],
        };
        const tx = await window.aptos.signAndSubmitTransaction(transaction);
        await client.waitForTransaction(tx.hash)
        return tx.hash
    }

}