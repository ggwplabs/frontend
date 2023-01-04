import {AptosClient} from "aptos";
import * as Addr from "./Addresses";
import {STAKE_ACCOUNT} from "./Addresses";

export default class FreezeService {

    static async getInfo(wallet) {
        const client = new AptosClient(Addr.NODE_URL)
        const resources = await client.getAccountResources(Addr.CORE_ACCOUNT)
        const userResources = await client.getAccountResources(wallet.address)
        let retVol = {
            frozenBalance: 0,
            gpassBalance: 0,
            lastGettingGpass: 0,
            rewardPeriod: 0,
            lastBurned: 0,
            burnPeriod: 0,
        }
        let indexGpassInfo = NaN
        let indexFreezingInfo = NaN
        for (var i = 0; i < resources.length; i++) {
            if (resources[i].type === '0x6442c17767e7f2cdb1b931565680dc84ab857c1fc12e68fadc7cec1ab4bfa3' + '::gpass::GpassInfo') {
                indexGpassInfo = i
            }
            if (resources[i].type === '0x6442c17767e7f2cdb1b931565680dc84ab857c1fc12e68fadc7cec1ab4bfa3' + '::gpass::FreezingInfo') {
                indexFreezingInfo = i
            }
        }
        console.log(resources)
        if (indexGpassInfo === NaN || indexFreezingInfo === NaN){
            throw "Stake account have not resource";
        }
        for (let i = 0; i < userResources.length; i++) {
            if (userResources[i].type === '0x6442c17767e7f2cdb1b931565680dc84ab857c1fc12e68fadc7cec1ab4bfa3::gpass::UserInfo') {
                retVol.frozenBalance = Number(userResources[i].data.freezed_amount / 10 ** 8);
                retVol.lastGettingGpass = Number(userResources[i].data.last_getting_gpass);
                retVol.rewardPeriod = Number(resources[indexFreezingInfo].data.reward_period);
            }
            if (userResources[i].type === '0x6442c17767e7f2cdb1b931565680dc84ab857c1fc12e68fadc7cec1ab4bfa3::gpass::Wallet') {
                retVol.gpassBalance = Number(userResources[i].data.amount);
                retVol.lastBurned = Number(userResources[i].data.last_burned);
                retVol.burnPeriod = Number(resources[indexGpassInfo].data.burn_period);
            }
        }
        return retVol
    }

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

    static async withdrawGpass() {
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

    static async unfreeze() {
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