import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import idlFaucet from './idl/faucet.json'
import {AnchorProvider, BN, Program} from "@project-serum/anchor";
import {createAssociatedTokenAccountInstruction} from "@solana/spl-token";

const SYSTEM_PROGRAM_ID = new PublicKey('11111111111111111111111111111111')
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const GGWPM_MINT = new PublicKey('5J5iMoraQ962XW7uApXQRTCu9jEahBnVCsGvzAjQKm9x')
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
const FAUCET_INFO = new PublicKey('27zFPQHDM2JbB58zZbNPXEuzFwL8a1qqkPpZ5JJ2LkNx')
const PROGRAM_ID = new PublicKey('6nA8HNRnMTwjn1VwA4Q2fX8D78hocs1zBDExngaaiTRH')

const opts = {preflightCommitment: "processed"}

export default class FaucetService {
    static async airdrop(network, userAccount, amount) {

        let connection = new Connection(
            clusterApiUrl(network),
        );

        const provider = new AnchorProvider(
            connection, window.solana, opts.preflightCommitment,
        )
        const program = new Program(idlFaucet, PROGRAM_ID, provider)
        const preInstructions = [];

        const GGPWWallet = await PublicKey.findProgramAddress(
            [
                userAccount.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                GGWPM_MINT.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        )

        const isInitGGPWWallet = await connection.getAccountInfo(GGPWWallet[0])
        if (isInitGGPWWallet === null) {
            preInstructions.push(
                createAssociatedTokenAccountInstruction(
                    userAccount,
                    GGPWWallet[0],
                    userAccount,
                    GGWPM_MINT
                )
            )
        }

        const userInfo = await PublicKey.findProgramAddress(
            [
                Buffer.from('user_info', 'utf8'),
                FAUCET_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            PROGRAM_ID
        )

        const GGWPMintAuth = await PublicKey.findProgramAddress(
            [
                Buffer.from('ggwp_mint_auth', 'utf8'),
                FAUCET_INFO.toBuffer(),
                GGWPM_MINT.toBuffer(),
            ],
            PROGRAM_ID
        )

        const tx = await program.methods.airdrop(new BN(amount * 10 ** 9))
            .accounts({
                user: userAccount,
                userInfo: userInfo[0],
                userGgwpWallet: GGPWWallet[0],
                faucetInfo: FAUCET_INFO,
                ggwpToken: GGWPM_MINT,
                ggwpMintAuth: GGWPMintAuth[0],
                systemProgram: SYSTEM_PROGRAM_ID,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .preInstructions(preInstructions)
            .rpc()

        return tx
    }
}