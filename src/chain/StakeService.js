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
        const userInfoAccount = await program.account.userInfo.fetch(userInfo[0].toString())

        return ({
            GGWPWallet: account[0].toString(),
            GGWPBalance: balance.value.uiAmount,
            amount: Number(userInfoAccount.amount) / 10 ** 9,
            date: new Date(Number(userInfoAccount.stakeTime) * 1000).toLocaleDateString(),
            time: new Date(Number(userInfoAccount.stakeTime) * 1000).toLocaleTimeString()
        })
    }

    static async stake(network, userAccount, GGWPWallet, amount) {

        const programID = new PublicKey('ELRFw9awBQFuvvxnf3R1Xaihdy6ypWY7sH6nTNXh8EX1')
        let connection = new Connection(
            clusterApiUrl(network),
        );
        const provider = new AnchorProvider(
            connection, window.solana, opts.preflightCommitment,
        )
        const program = new Program(idlStaking, programID, provider)
        const userInfo = await PublicKey.findProgramAddress(
            [
                Buffer.from('user_info', 'utf8'),
                STAKING_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            programID
        )

        const stakingInfo = await program.account.stakingInfo.fetch(STAKING_INFO)
        console.log(network)
        console.log(userAccount)
        console.log(GGWPWallet)
        console.log(amount)
        const tx = await program.rpc.stake(new BN(amount * 10**9), {
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

    // async function Airdrop() {
    //     let connection = new web3.Connection(
    //         web3.clusterApiUrl(props.network),
    //     );
    //
    //     let airdropSignature = await connection.requestAirdrop(
    //         props.provider.publicKey,
    //         web3.LAMPORTS_PER_SOL,
    //     );
    //     await connection.confirmTransaction(airdropSignature);
    // }
    //
    // async function Send() {
    //     let connection = new web3.Connection(
    //         web3.clusterApiUrl(props.network),
    //     );
    //
    //     const recieverWallet = new web3.PublicKey(accTo.toString())
    //
    //     const transaction = new web3.Transaction().add(
    //         web3.SystemProgram.transfer({
    //             fromPubkey: props.provider.publicKey,
    //             toPubkey: recieverWallet,
    //             lamports: web3.LAMPORTS_PER_SOL / 2
    //         }),
    //     );
    //
    //     transaction.feePayer = await props.provider.publicKey;
    //     let blockhashObj = await connection.getRecentBlockhash();
    //     transaction.recentBlockhash = await blockhashObj.blockhash;
    //     let signed = await props.provider.signTransaction(transaction);
    //     let signature = await connection.sendRawTransaction(signed.serialize());
    //     await connection.confirmTransaction(signature);
    // }
}