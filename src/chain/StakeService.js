import {Program, AnchorProvider, BN} from "@project-serum/anchor";
import idlStaking from "../chain/idl/staking.json"
import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";

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
    static async getInfo(network, userAccount) {
        let connection = new Connection(
            clusterApiUrl(network),
        );

        const provider = new AnchorProvider(
            connection, window.solana, opts.preflightCommitment,
        )
        const programStaking = new Program(idlStaking, PROGRAM_ID, provider)
        const userInfo = await PublicKey.findProgramAddress(
            [
                Buffer.from('user_info', 'utf8'),
                STAKING_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            PROGRAM_ID
        )

        const stakingInfo = await programStaking.account.stakingInfo.fetch(STAKING_INFO)


        try {
            const userInfoAccount = await programStaking.account.userInfo.fetch(userInfo[0].toString())
            return({
                aprEnd: stakingInfo.aprEnd,
                aprStart: stakingInfo.aprStart,
                aprStep: stakingInfo.aprStep,
                epoch: Number(stakingInfo.epoch),
                epochPeriodDays: stakingInfo.epochPeriodDays,
                minStakeAmount: Number(stakingInfo.minStakeAmount),
                royalty: stakingInfo.royalty,
                startTime: Number(stakingInfo.startTime),
                amount: Number(userInfoAccount.amount),
                stakeTime: Number(userInfoAccount.stakeTime),
            })
        } catch (e) {
            if (e.message === 'Account does not exist ' + userInfo[0].toString()) {
                return({
                    aprEnd: stakingInfo.aprEnd,
                    aprStart: stakingInfo.aprStart,
                    aprStep: stakingInfo.aprStep,
                    epoch: Number(stakingInfo.epoch),
                    epochPeriodDays: stakingInfo.epochPeriodDays,
                    minStakeAmount: Number(stakingInfo.minStakeAmount),
                    royalty: stakingInfo.royalty,
                    startTime: Number(stakingInfo.startTime),
                    amount: 0,
                    stakeTime: 0,
                })
            }
        }
    }

    static async stake(network, userAccount, amount) {

        let connection = new Connection(
            clusterApiUrl(network),
        );
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

        const GGWPWallet = await PublicKey.findProgramAddress(
            [
                userAccount.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                GGWPM_MINT_ACCOUNT.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        )

        const stakingInfo = await program.account.stakingInfo.fetch(STAKING_INFO)

        const tx = await program.methods.stake(new BN(amount * 10 ** 9))
            .accounts({
                user: userAccount,
                stakingInfo: STAKING_INFO,
                userInfo: userInfo[0],
                userGgwpWallet: GGWPWallet[0],
                treasury: stakingInfo.treasury,
                accumulativeFund: ACCUMULATIVE_FUND,
                systemProgram: SYSTEM_PROGRAM_ID,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .rpc()

        return tx
    }

    static async withdraw(network, userAccount) {
        let connection = new Connection(
            clusterApiUrl(network),
        );
        const provider = new AnchorProvider(
            connection, window.solana, opts.preflightCommitment,
        )
        const program = new Program(idlStaking, PROGRAM_ID, provider)

        const stakingInfo = await program.account.stakingInfo.fetch(STAKING_INFO)

        const GGWPWallet = await PublicKey.findProgramAddress(
            [
                userAccount.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                GGWPM_MINT_ACCOUNT.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        )

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

        const tx = await program.methods.withdraw()
            .accounts({
                user: userAccount,
                stakingInfo: STAKING_INFO,
                userInfo: userInfo[0],
                userGgwpWallet: GGWPWallet[0],
                treasuryAuth: treasuryAuth[0],
                stakingFundAuth: stakingFundAuth[0],
                treasury: stakingInfo.treasury,
                accumulativeFund: stakingInfo.accumulativeFund,
                stakingFund: STAKING_FUND,
                systemProgram: SYSTEM_PROGRAM_ID,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .rpc()
        return tx
    }

}