import * as Addr from "./Addresses.js"
import {AptosClient} from "aptos";
import {STAKE_ACCOUNT} from "./Addresses.js";

export default class StakeService {

    static async getInfo(wallet) {
        const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1')
        const resources = await client.getAccountResources(Addr.STAKE_ACCOUNT)
        const userResources = await client.getAccountResources(wallet.address)
        let index = NaN;
        for (var i = 0; i < resources.length; i++) {
            if (resources[i].type === '0x' + STAKE_ACCOUNT + '::staking::StakingInfo') {
                index = i
            }
        }
        if (index === NaN){
            throw "Core account have not resource";
        }
        for (var i = 0; i < userResources.length; i++) {
            if (userResources[i].type === '0x' + STAKE_ACCOUNT + '::staking::UserInfo') {
                const res = await client.getAccountResource(wallet.address, '0x' + STAKE_ACCOUNT + '::staking::UserInfo')
                return ({
                    aprEnd: Number(resources[2].data.apr_end),
                    aprStart: Number(resources[2].data.apr_start),
                    aprStep: Number(resources[2].data.apr_step),
                    epoch: 1,
                    epochPeriodDays: Number(resources[2].data.epoch_period / 86400),
                    minStakeAmount: Number(resources[2].data.min_stake_amount),
                    royalty: Number(resources[2].data.royalty),
                    startTime: Number(resources[2].data.start_time),
                    amount: Number(res.data.amount),
                    stakeTime: Number(res.data.stake_time),
                })
            }
        }
        return ({
            aprEnd: Number(resources[2].data.apr_end),
            aprStart: Number(resources[2].data.apr_start),
            aprStep: Number(resources[2].data.apr_step),
            epoch: 1,
            epochPeriodDays: Number(resources[2].data.epoch_period / 86400),
            minStakeAmount: Number(resources[2].data.min_stake_amount),
            royalty: Number(resources[2].data.royalty),
            startTime: Number(resources[2].data.start_time),
            amount: 0,
            stakeTime: 0,
        })
    }

    static async stake(network, userAccount, amount) {
        const client = new AptosClient(Addr.NODE_URL);
        const transaction = {
            type: "entry_function_payload",
            function: '0x' + Addr.STAKE_ACCOUNT + '::staking::stake',
            arguments: [Addr.STAKE_ACCOUNT, amount * 10**8],
            type_arguments: [],
        };
        const tx = await window.aptos.signAndSubmitTransaction(transaction);
        await client.waitForTransaction(tx.hash)
        return tx.hash
    }

    static async withdraw() {
        const client = new AptosClient(Addr.NODE_URL);
        const transaction = {
            type: "entry_function_payload",
            function: '0x' + Addr.STAKE_ACCOUNT + '::staking::withdraw',
            arguments: [Addr.STAKE_ACCOUNT],
            type_arguments: [],
        };
        const tx = await window.aptos.signAndSubmitTransaction(transaction);
        await client.waitForTransaction(tx.hash)
        return tx.hash
    }

}