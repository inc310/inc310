import { useEffect, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';

const network = WalletAdapterNetwork.Devnet; // Utiliser Devnet pour le test
const endpoint = `https://api.devnet.solana.com`; // Endpoint pour Devnet

function WalletConnection() {
    const { connect, disconnect, publicKey, connected } = useWallet();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        if (publicKey) {
            const connection = new Connection(endpoint);
            connection.getBalance(publicKey).then(setBalance);
        }
    }, [publicKey]);

    return (
        <div>
            {connected ? (
                <div>
                    <p>Adresse : {publicKey.toBase58()}</p>
                    <p>Solde : {balance ? balance / 1e9 : 'Chargement...'} SOL</p>
                    <button onClick={disconnect}>Déconnecter</button>
                </div>
            ) : (
                <button onClick={connect}>Connecter Wallet</button>
            )}
        </div>
    );
}

export default function Wallet() {
    const wallets = [new PhantomWalletAdapter()];
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletConnection />
            </WalletProvider>
        </ConnectionProvider>
    );
}
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Réseau à utiliser (ici, nous utilisons le Devnet)
const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);

// Liste des wallets disponibles
const wallets = [new PhantomWalletAdapter()];

export { endpoint, wallets };
