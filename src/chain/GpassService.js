import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import idlGpass from './idl/gpass.json'
import {AnchorProvider, Program} from "@project-serum/anchor";
const GPASS_INFO = new PublicKey('A956aTN5e27jxtNtv7tEzb1Aam9akUW7gmNx5tYQtZzy')
const GPASS_PROGRAM_ID = new PublicKey('Gv9WAng6iPymaDwXMQrbsh2uTkDpAPTB89Ld4ctJejMG')


const opts = {preflightCommitment: "processed"}

export default class GpassService {

    static async getInfo(network, userAccount) {
        let connection = new Connection(
            clusterApiUrl(network),
        );

        const provider = new AnchorProvider(
            connection, window.solana, opts.preflightCommitment,
        )

        const program = new Program(idlGpass, GPASS_PROGRAM_ID, provider)

        const walletAccount = await PublicKey.findProgramAddress(
            [
                Buffer.from('user_gpass_wallet', 'utf8'),
                GPASS_INFO.toBuffer(),
                userAccount.toBuffer(),
            ],
            GPASS_PROGRAM_ID
        )

        const info = await program.account.gpassInfo.fetch(GPASS_INFO)

        let wallet;
        try {
            wallet = await program.account.wallet.fetch(walletAccount[0].toString())
        } catch (e) {
            if (e.message === 'Account does not exist ' + walletAccount[0].toString()) {
                wallet = {
                    amount: 0,
                    lastBurned: 0,
                    burnPeriod: info.burnPeriod
                }
            } else {
                console.log(e)
            }
        }

        return {
            amount: wallet.amount,
            lastBurned: wallet.lastBurned,
            burnPeriod: info.burnPeriod
        }
    }

}