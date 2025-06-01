import { useConnectWallet, useWallets } from "@privy-io/react-auth"

const Connection = () => {
  const { connectWallet } = useConnectWallet()
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
      <button
        onClick={async () => {
          const provider = await wallet.getEthereumProvider()
          await provider.request({
            method: "wallet_revokePermissions",
            params: [{ eth_accounts: {} }],
          })
        }}
      >
        Disconnect
      </button>
    </>
  )
}

export default Connection
