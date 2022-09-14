import {Program, AnchorProvider, BN} from "@project-serum/anchor";
import idlStaking from "../chain/idl/staking.json"
import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const GGWPM_MINT_ACCOUNT = new PublicKey('5J5iMoraQ962XW7uApXQRTCu9jEahBnVCsGvzAjQKm9x')
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
const SYSTEM_PROGRAM_ID = new PublicKey('11111111111111111111111111111111')
const STAKING_INFO = new PublicKey('6pxztvdsDpmAXRj6btu8piVxJmwn3Vu2eiYMn8BnuYDK')
const ACCUMULATIVE_FUND = new PublicKey('71uJ6ncA8tgPfCiWgLL1XXRBKFAf5gKb6RyHqgRGajd5')
const PROGRAM_ID = new PublicKey('ELRFw9awBQFuvvxnf3R1Xaihdy6ypWY7sH6nTNXh8EX1')
const STAKING_FUND = new PublicKey('59W5xgePwhTgy8WiUbrgmAwQ7btzkNQaL4foZNbPMyLm');

const opts = {preflightCommitment: "processed"}

export default class StakeService {
    static async getInfo(network, userAccount) {
        // Find GGWP wallet account
        let connection = new Connection(
            clusterApiUrl(network),
        );
        const account = await PublicKey.findProgramAddress(
            [
                userAccount.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                GGWPM_MINT_ACCOUNT.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        )

        // Get GGWP balance
        const balance = await connection.getTokenAccountBalance(account[0])

        // Get stake status
        const provider = new AnchorProvider(
            connection, window.solana, opts.preflightCommitment,
        )
        const program = new Program(idlStaking, PROGRAM_ID, provider)
        const userInfo = await PublicKey.findProgramAddress(
            [
                Buffer.from('user_info', 'utf8'),
                STAKING_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            PROGRAM_ID
        )

        let userInfoAccount;
        try {
            userInfoAccount = await program.account.userInfo.fetch(userInfo[0].toString())
        } catch (e) {
            if (e.message == 'Account does not exist ' + userInfo[0].toString()) {
                userInfoAccount = {
                    amount: 0,
                    stakeTime: 0,
                }
            }
        }

        return ({
            GGWPWallet: account[0].toString(),
            GGWPBalance: balance.value.uiAmount,
            amount: Number(userInfoAccount.amount) / 10 ** 9,
            date: new Date(Number(userInfoAccount.stakeTime) * 1000).toLocaleDateString(),
            time: new Date(Number(userInfoAccount.stakeTime) * 1000).toLocaleTimeString()
        })
    }

    static async stake(network, userAccount, GGWPWallet, amount) {

        let connection = new Connection(
            clusterApiUrl(network),
        );
        console.log(userAccount)
        const provider = new AnchorProvider(
            connection, window.solana, opts.preflightCommitment,
        )
        const program = new Program(idlStaking, PROGRAM_ID, provider)
        const userInfo = await PublicKey.findProgramAddress(
            [
                Buffer.from('user_info', 'utf8'),
                STAKING_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            PROGRAM_ID
        )

        const stakingInfo = await program.account.stakingInfo.fetch(STAKING_INFO)

        const tx = await program.rpc.stake(new BN(amount * 10 ** 9), {
            accounts: {
                user: userAccount,
                stakingInfo: STAKING_INFO,
                userInfo: userInfo[0],
                userGgwpWallet: new PublicKey(GGWPWallet),
                treasury: stakingInfo.treasury,
                accumulativeFund: ACCUMULATIVE_FUND,
                systemProgram: SYSTEM_PROGRAM_ID,
                tokenProgram: TOKEN_PROGRAM_ID,
            }
        })
        return tx
    }

    static async withdraw(network, userAccount, GGWPWallet) {
        let connection = new Connection(
            clusterApiUrl(network),
        );
        const provider = new AnchorProvider(
            connection, window.solana, opts.preflightCommitment,
        )
        const program = new Program(idlStaking, PROGRAM_ID, provider)

        const stakingInfo = await program.account.stakingInfo.fetch(STAKING_INFO)

        const userInfo = await PublicKey.findProgramAddress(
            [
                Buffer.from('user_info', 'utf8'),
                STAKING_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            PROGRAM_ID
        )
        const treasuryAuth = await PublicKey.findProgramAddress(
            [
                Buffer.from('treasury_auth', 'utf8'),
                STAKING_INFO.toBuffer(),
            ],
            PROGRAM_ID
        )
        const stakingFundAuth = await PublicKey.findProgramAddress(
            [
                Buffer.from('staking_fund_auth', 'utf8'),
                STAKING_INFO.toBuffer(),
            ],
            PROGRAM_ID
        )

        const tx = await program.rpc.withdraw({
            accounts: {
                user: userAccount,
                stakingInfo: STAKING_INFO,
                userInfo: userInfo[0],
                userGgwpWallet: new PublicKey(GGWPWallet),
                treasuryAuth: treasuryAuth[0],
                stakingFundAuth: stakingFundAuth[0],
                treasury: stakingInfo.treasury,
                accumulativeFund: stakingInfo.accumulativeFund,
                stakingFund: STAKING_FUND,
                systemProgram: SYSTEM_PROGRAM_ID,
                tokenProgram: TOKEN_PROGRAM_ID,
            }
        })
        return tx
    }

}