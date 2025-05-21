import { useConnectWallet, useWallets } from "@privy-io/react-auth"
import { useDisconnect } from "wagmi"

const Connection = () => {
  const { connectWallet } = useConnectWallet()
  const { disconnect } = useDisconnect()
  const { ready, wallets } = useWallets()
  const wallet = wallets[0]

  if (!wallet?.address) {
    return (
      <button onClick={connectWallet} disabled={!ready}>
        Connect
      </button>
    )
  }

  return (
    <>
      <p>{wallet.address}</p>
      <button onClick={() => disconnect()}>Disconnect</button>
    </>
  )
}

export default Connection
