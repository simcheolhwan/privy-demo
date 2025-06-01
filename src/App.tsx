import Connection from "./Connection"
import Send from "./Send"
import Sign from "./Sign"

const App = () => {
  return (
    <>
      <p>
        Source code:{" "}
        <a href="https://github.com/simcheolhwan/privy-demo" target="_blank">
          https://github.com/simcheolhwan/privy-demo
        </a>
      </p>
      <Connection />
      <hr />
      <Send />
      <hr />
      <Sign />
    </>
  )
}

export default App
