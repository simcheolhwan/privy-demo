import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./src/App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PrivyProvider } from "@privy-io/react-auth"
import { WagmiProvider } from "@privy-io/wagmi"
import { createConfig, http } from "wagmi"
import { mainnet } from "wagmi/chains"

const PRIVY_APP_ID = "cm0c6axwl00en12cam7m1ca18"

const privyConfig = { appearance: { walletList: ["detected_wallets" as const] } }
const wagmiConfig = createConfig({ chains: [mainnet], transports: { [mainnet.id]: http() } })
const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider appId={PRIVY_APP_ID} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <App />
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  </StrictMode>,
)
