import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAccount } from "wagmi";

// --------- WAGMI package importation ---------
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// --------- React Toastify importation ---------
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './style.css'
import Home from './views/Home'
// import PageHome from './views/page'
import ConnectWalletPage from './views/connect-wallet'
import Home2 from './views/Home2'

const { chains, provider } = configureChains(
  [ mainnet, polygon, optimism, arbitrum ],
  [
    alchemyProvider({ apiKey: process.env.PROJECT_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'alfa.society',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const App = () => {

   //using the user address when they get connected using their wallet to dynamically navigate the user to the Home page 
   const { address } = useAccount();

  return (
    <Router>
      <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
       <ToastContainer />
       <Routes>
         <Route path="/" element={<ConnectWalletPage />} />
         <Route path={`/${address}`} element={<Home />} />
         <Route path={`/home-eth`} element={<Home2 />} />
      </Routes>
      </RainbowKitProvider>
      </WagmiConfig>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))