import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import idlFreezing from './idl/freezing.json'
import idlGpass from './idl/gpass.json'
import {AnchorProvider, BN, Program} from "@project-serum/anchor";
import {createAssociatedTokenAccountInstruction} from "@solana/spl-token";

const SYSTEM_PROGRAM_ID = new PublicKey('11111111111111111111111111111111')
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const GGWPM_MINT = new PublicKey('5J5iMoraQ962XW7uApXQRTCu9jEahBnVCsGvzAjQKm9x')
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
const FREEZING_INFO = new PublicKey('5CnPng7bfgZ5Nnchwe7ZFrvxro9JAZNPHk2e3Gh94n2S')
const GPASS_INFO = new PublicKey('A956aTN5e27jxtNtv7tEzb1Aam9akUW7gmNx5tYQtZzy')
const GPASS_PROGRAM_ID = new PublicKey('Gv9WAng6iPymaDwXMQrbsh2uTkDpAPTB89Ld4ctJejMG')
const FREEZING_PROGRAM_ID = new PublicKey('ABHUowgjyTkmbMRRuMYJ5ui4wAz6Z6HE4PQMHy9YqMrQ')


const opts = {preflightCommitment: "processed"}

export default class FreezeService {
    static async freezing(network, userAccount, amount) {

        let connection = new Connection(clusterApiUrl(network));

        const provider = new AnchorProvider(connection, window.solana, opts.preflightCommitment,)
        const programFreezing = new Program(idlFreezing, FREEZING_PROGRAM_ID, provider)
        const programGpass = new Program(idlGpass, GPASS_PROGRAM_ID, provider)
        const preInstructions = [];

        const freezingInfo = await programFreezing.account.freezingInfo.fetch(FREEZING_INFO)

        const GGPWWallet = await PublicKey.findProgramAddress([
                userAccount.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                GGWPM_MINT.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        )

        const gpassWallet = await PublicKey.findProgramAddress([
                Buffer.from('user_gpass_wallet', 'utf8'),
                freezingInfo.gpassInfo.toBuffer(),
                userAccount.toBuffer(),
            ],
            GPASS_PROGRAM_ID
        )

        const isInitGGPWWallet = await connection.getAccountInfo(GGPWWallet[0])
        if (isInitGGPWWallet === null) {
            preInstructions.push(
                createAssociatedTokenAccountInstruction(
                    userAccount,
                    GGPWWallet[0],
                    userAccount,
                    GGWPM_MINT
                ))
        }

        const isInitGpassWallet = await connection.getAccountInfo(gpassWallet[0])
        if (isInitGpassWallet === null) {
            preInstructions.push(await programGpass.methods.createWallet()
                .accounts({
                    payer: userAccount,
                    user: userAccount,
                    gpassInfo: GPASS_INFO,
                    wallet: gpassWallet[0],
                    systemProgram: SYSTEM_PROGRAM_ID,
                })
                .instruction())
        }

        const userInfo = await PublicKey.findProgramAddress([
                Buffer.from('user_info', 'utf8'),
                FREEZING_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            FREEZING_PROGRAM_ID
        )

        const gpassMintAuth = await PublicKey.findProgramAddress([Buffer.from('gpass_mint_auth', 'utf8'), FREEZING_INFO.toBuffer(), GPASS_INFO.toBuffer()], FREEZING_PROGRAM_ID)

        const tx = await programFreezing.methods.freeze(new BN(amount * 10 ** 9))
            .accounts({
                user: userAccount,
                userInfo: userInfo[0],
                freezingInfo: FREEZING_INFO,
                gpassInfo: GPASS_INFO,
                userGgwpWallet: GGPWWallet[0],
                userGpassWallet: gpassWallet[0],
                treasury: freezingInfo.treasury,
                accumulativeFund: freezingInfo.accumulativeFund,
                gpassMintAuth: gpassMintAuth[0],
                gpassProgram: GPASS_PROGRAM_ID,
                systemProgram: SYSTEM_PROGRAM_ID,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .preInstructions(preInstructions)
            .rpc()

        return tx
    }

    static async getInfo(network, userAccount) {
        let connection = new Connection(clusterApiUrl(network));

        const provider = new AnchorProvider(
            connection, window.solana, opts.preflightCommitment,
        )
        const programFreezing = new Program(idlFreezing, FREEZING_PROGRAM_ID, provider)

        const userInfo = await PublicKey.findProgramAddress([
                Buffer.from('user_info', 'utf8'),
                FREEZING_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            FREEZING_PROGRAM_ID
        )

        const freezingInfo = await programFreezing.account.freezingInfo.fetch(FREEZING_INFO)

        const isInitUserInfo = await connection.getAccountInfo(userInfo[0])

        if (isInitUserInfo === null) {
            return {
                amount: 0,
                freezedTime: 0,
                lastGettingGpass: 0,
                rewardPeriod: 0
            }
        }

        let userInfoAccount;

        try {
            userInfoAccount = await programFreezing.account.userInfo.fetch(userInfo[0].toString())
            return {
                amount: Number(userInfoAccount.freezedAmount) / 10**9,
                freezedTime: Number(userInfoAccount.freezedTime),
                lastGettingGpass: Number(userInfoAccount.lastGettingGpass),
                rewardPeriod: Number(freezingInfo.rewardPeriod)
            }
        } catch (e) {
            console.log(e)
        }
    }

    static async withdrawGpass(network, userAccount) {
        let connection = new Connection(
            clusterApiUrl(network),
        );

        const provider = new AnchorProvider(
            connection, window.solana, opts.preflightCommitment,
        )
        const programFreezing = new Program(idlFreezing, FREEZING_PROGRAM_ID, provider)

        const userInfo = await PublicKey.findProgramAddress([
                Buffer.from('user_info', 'utf8'),
                FREEZING_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            FREEZING_PROGRAM_ID
        )

        const gpassWallet = await PublicKey.findProgramAddress([
                Buffer.from('user_gpass_wallet', 'utf8'),
                GPASS_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            GPASS_PROGRAM_ID
        )

        const gpassMintAuth = await PublicKey.findProgramAddress([
                Buffer.from('gpass_mint_auth', 'utf8'),
                FREEZING_INFO.toBuffer(),
                GPASS_INFO.toBuffer(),
            ],
            FREEZING_PROGRAM_ID
        )

        const tx = await programFreezing.methods.withdrawGpass()
            .accounts({
                user: userAccount,
                userInfo: userInfo[0],
                freezingInfo: FREEZING_INFO,
                gpassInfo: GPASS_INFO,
                userGpassWallet: gpassWallet[0],
                gpassMintAuth: gpassMintAuth[0],
                gpassProgram: GPASS_PROGRAM_ID
            })
            .rpc()

        return tx;
    }

    static async unfreeze(network, userAccount) {
        let connection = new Connection(
            clusterApiUrl(network),
        );

        const provider = new AnchorProvider(
            connection, window.solana, opts.preflightCommitment,
        )
        const programFreezing = new Program(idlFreezing, FREEZING_PROGRAM_ID, provider)

        const userInfo = await PublicKey.findProgramAddress([
                Buffer.from('user_info', 'utf8'),
                FREEZING_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            FREEZING_PROGRAM_ID
        )

        const gpassWallet = await PublicKey.findProgramAddress([
                Buffer.from('user_gpass_wallet', 'utf8'),
                GPASS_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            GPASS_PROGRAM_ID
        )

        const GGPWWallet = await PublicKey.findProgramAddress([
                userAccount.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                GGWPM_MINT.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        )

        const gpassMintAuth = await PublicKey.findProgramAddress([
                Buffer.from('gpass_mint_auth', 'utf8'),
                FREEZING_INFO.toBuffer(),
                GPASS_INFO.toBuffer(),
            ],
            FREEZING_PROGRAM_ID
        )

        const freezingInfo = await programFreezing.account.freezingInfo.fetch(FREEZING_INFO)

        const treasuryAuth = await PublicKey.findProgramAddress([
                Buffer.from('treasury_auth', 'utf8'),
                FREEZING_INFO.toBuffer(),
            ],
            FREEZING_PROGRAM_ID
        )

        const tx = await programFreezing.methods.unfreeze()
            .accounts({
                user: userAccount,
                userInfo: userInfo[0],
                freezingInfo: FREEZING_INFO,
                gpassInfo: GPASS_INFO,
                userGpassWallet: gpassWallet[0],
                userGgwpWallet: GGPWWallet[0],
                gpassMintAuth: gpassMintAuth[0],
                accumulativeFund: freezingInfo.accumulativeFund,
                treasury: freezingInfo.treasury,
                treasuryAuth: treasuryAuth[0],
                tokenProgram: TOKEN_PROGRAM_ID,
                gpassProgram: GPASS_PROGRAM_ID
            })
            .rpc()

        return tx

    }

}