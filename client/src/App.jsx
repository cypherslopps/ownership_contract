import { useEffect, useState } from 'react';
import GreeterContract from "./contracts/FirstContract.json";
import getWeb3 from "./utils/getWeb3";

function App() {
  const [state, setState] = useState({
    greeting: '',
    web3: null,
    accounts: null,
    contract: null
  });

  useEffect(() => {
    async function getProvider() {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = GreeterContract.networks[networkId];
        const instance = new web3.eth.Contract(
          GreeterContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        console.log(networkId, deployedNetwork, instance, accounts)
  
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setState({ 
          ...state,
          web3, 
          accounts,
          contract: instance 
        });

        await runExample();
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }

    getProvider();
  }, [])

  const runExample = async () => {
    const { contract } = state;
    const response = await contract.methods.greet().call();
    console.log(response)

    setState({ ...state, greeting: response });
  };

  const handleGreetingChange = (e) => {
    const inputVal = e.target.value
    setState({ ...state, greeting: inputVal })
  }

  const formSubmitHandler = async () => {
    const { accounts, contract, greeting } = state;
    await contract.methods.setGreeting(greeting).send({from: accounts[0]});
  }

  if (!state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="App">
      <h1>Greeter</h1>

      {/* {state.greeting} */}

      <form>
        <label>
          New Greeting:
          <input type="text" value={state.greeting} onChange={e => handleGreetingChange(e)} />
        </label>
      </form>

      <button onClick={formSubmitHandler}> Submit </button>

    </div>
  )
}

export default App
