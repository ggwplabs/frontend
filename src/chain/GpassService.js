import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import idlFreezing from './idl/freezing.json'
import idlGpass from './idl/gpass.json'
import {AnchorProvider, BN, Program} from "@project-serum/anchor";
import {createAssociatedTokenAccountInstruction} from "@solana/spl-token";
import idlStaking from "./idl/staking.json";

const SYSTEM_PROGRAM_ID = new PublicKey('11111111111111111111111111111111')
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const GGWPM_MINT = new PublicKey('5J5iMoraQ962XW7uApXQRTCu9jEahBnVCsGvzAjQKm9x')
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
const FREEZING_INFO = new PublicKey('9kP4Rdf3S3Zyqh6LHmQpdr2KzWxMCVYgGyUvYtEgcc3z')
const GPASS_INFO = new PublicKey('A956aTN5e27jxtNtv7tEzb1Aam9akUW7gmNx5tYQtZzy')
const GPASS_PROGRAM_ID = new PublicKey('Gv9WAng6iPymaDwXMQrbsh2uTkDpAPTB89Ld4ctJejMG')
const FREEZING_PROGRAM_ID = new PublicKey('ABHUowgjyTkmbMRRuMYJ5ui4wAz6Z6HE4PQMHy9YqMrQ')


const opts = {preflightCommitment: "processed"}

export default class GpassService {

    static async getBalance(network, userAccount) {
        let connection = new Connection(
            clusterApiUrl(network),
        );

        const provider = new AnchorProvider(
            connection, window.solana, opts.preflightCommitment,
        )
        // const programFreezing = new Program(idlFreezing, FREEZING_PROGRAM_ID, provider)

        const program = new Program(idlGpass, GPASS_PROGRAM_ID, provider)

        const walletAccount = await PublicKey.findProgramAddress(
            [
                Buffer.from('user_gpass_wallet', 'utf8'),
                GPASS_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            GPASS_PROGRAM_ID
        )

        let wallet;
        try {
            wallet = await program.account.wallet.fetch(walletAccount[0].toString())
        } catch (e) {
            if (e.message === 'Account does not exist ' + walletAccount[0].toString()) {
                wallet = {
                    amount: 0,
                    lastBurnet: 0,
                }
            } else {
                console.log(e)
            }
        }
        return wallet
    }

}