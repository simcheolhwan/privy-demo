import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useWallets } from "@privy-io/react-auth"

interface FormValues {
  message: string
}

const Sign = () => {
  const { wallets } = useWallets()
  const wallet = wallets[0]

  const { register, handleSubmit } = useForm({
    defaultValues: { message: "Hello, world!" },
  })

  const { mutate, data, isPending, error } = useMutation({
    mutationFn: ({ message }: FormValues) => {
      if (!wallet) throw new Error("Wallet not connected")
      return wallet.sign(message)
    },
  })

  const renderResult = () => {
    if (error) return <p>{error.message}</p>
    if (data) return <pre>{data}</pre>
  }

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))}>
      <h2>Sign</h2>

      <label htmlFor="message">Message</label>
      <input id="message" {...register("message")} />

      <button type="submit" disabled={isPending}>
        Submit
      </button>

      {renderResult()}
    </form>
  )
}

export default Sign
