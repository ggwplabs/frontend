import * as Addr from "./Addresses.js"

import {Program, AnchorProvider, BN} from "@project-serum/anchor";
import idlStaking from "../chain/idl/staking.json"
import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import {AptosClient} from "aptos";
import {STAKE_ACCOUNT} from "./Addresses.js";

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const GGWPM_MINT_ACCOUNT = new PublicKey('5J5iMoraQ962XW7uApXQRTCu9jEahBnVCsGvzAjQKm9x')
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
const SYSTEM_PROGRAM_ID = new PublicKey('11111111111111111111111111111111')
const STAKING_INFO = new PublicKey('X6bHGGFC7RwgNyMKWRpLpy63gmNogSAdpZcb58Ut35K')
const ACCUMULATIVE_FUND = new PublicKey('6Z1QsKwN2DUcuS7gpF1tvrmafPg3nQvdDctGgDUQqLLf')
const PROGRAM_ID = new PublicKey('ELRFw9awBQFuvvxnf3R1Xaihdy6ypWY7sH6nTNXh8EX1')
const STAKING_FUND = new PublicKey('6hmnXJEvdoWKY7CfGocFdtVvZeai1qsCFjwgLUKim99R');

const opts = {preflightCommitment: "processed"}

export default class StakeService {

    static async getInfo(wallet) {
        const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1')
        const resources = await client.getAccountResources(Addr.STAKE_ACCOUNT)
        const userResources = await client.getAccountResources(wallet.address)
        for (var i = 0; i < userResources.length; i++) {
            if (userResources[i].type === '0x' + STAKE_ACCOUNT + '::staking::UserInfo') {
                const res = await client.getAccountResource(wallet.address, '0x' +STAKE_ACCOUNT + '::staking::UserInfo')
                return ({
                    aprEnd: Number(resources[1].data.apr_end),
                    aprStart: Number(resources[1].data.apr_start),
                    aprStep: Number(resources[1].data.apr_step),
                    epoch: 1,
                    epochPeriodDays: Number(resources[1].data.epoch_period / 86400),
                    minStakeAmount: Number(resources[1].data.min_stake_amount),
                    royalty: Number(resources[1].data.royalty),
                    startTime: Number(resources[1].data.start_time),
                    amount: Number(res.data.amount),
                    stakeTime: Number(res.data.stake_time),
                })
            }
        }
        return ({
            aprEnd: Number(resources[1].data.apr_end),
            aprStart: Number(resources[1].data.apr_start),
            aprStep: Number(resources[1].data.apr_step),
            epoch: 1,
            epochPeriodDays: Number(resources[1].data.epoch_period / 86400),
            minStakeAmount: Number(resources[1].data.min_stake_amount),
            royalty: Number(resources[1].data.royalty),
            startTime: Number(resources[1].data.start_time),
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