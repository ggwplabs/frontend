import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const GGWPM_MINT_ACCOUNT = new PublicKey('5J5iMoraQ962XW7uApXQRTCu9jEahBnVCsGvzAjQKm9x')
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')

export default class WalletService {
    static async getGgwpBalance(network, userAccount) {
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

        const balance = await connection.getTokenAccountBalance(account[0])
        return balance.value.uiAmount
    }
}