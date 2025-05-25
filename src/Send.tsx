import BigNumber from "bignumber.js"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useWallets } from "@privy-io/react-auth"

interface FormValues {
  to: string
  value: string
}

const Send = () => {
  const { wallets } = useWallets()
  const wallet = wallets[0]

  const { register, setValue, handleSubmit } = useForm({
    defaultValues: { to: "", value: "" },
  })

  useEffect(() => {
    if (wallet) {
      setValue("to", wallet.address)
    }
  }, [wallet])

  const { mutate, data, isPending, error } = useMutation({
    mutationFn: async ({ to, value }: FormValues) => {
      if (!wallet) throw new Error("Wallet not connected")
      const provider = await wallet.getEthereumProvider()
      return provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: wallet.address,
            to,
            value: `0x${BigNumber(value).times(1e18).toString(16)}`,
          },
        ],
      })
    },
  })

  const renderResult = () => {
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
    if (data) return <pre>{data}</pre>
  }

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))}>
      <h2>Send</h2>

      <label htmlFor="to">To</label>
      <input id="to" {...register("to")} />

      <label htmlFor="value">Value</label>
      <input id="value" {...register("value")} />

      <button type="submit" disabled={isPending}>
        Submit
      </button>

      {renderResult()}
    </form>
  )
}

export default Send
