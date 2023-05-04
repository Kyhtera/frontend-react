import React, { useState, useEffect } from "react";

import { ethers } from "ethers";
import "./App.css";
import GreetingContract from "./abis/HelloSolidity.json";

const greetingAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [greet, setGreet] = useState("");
  const [newGreet, setNewGreet] = useState("");

  //console.log(window);
  useEffect(() => {
    getGreeting();
  }, []);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getGreeting() {
    if (window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greetingAddress,
        GreetingContract,
        provider
      );
      //console.log(ethers);
      try {
        const greeting = await contract.greet();
        console.log(newGreet);
      } catch (error) {
        console.error(error);
      }
      console.log(contract);
    }
  }

  async function setGreeting(newGreeting) {
    if (window.ethereum !== undefined) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greetingAddress,
        GreetingContract,
        provider.getSigner()
      );
      const transaction = await contract.setGreeting(newGreeting);
      await transaction.wait();
      setGreet(newGreet);
      setNewGreet("");
    }
  }

  requestAccount();

  {
    /*function handleInputChange(event) {
    const inputValue = event.target.value;
    setNewGreet(inputValue !== "" ? inputValue : "First Greeting");
  }*/
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>{greet}</h1>
          <button onClick={getGreeting}>Get Greeting</button>
          <button onClick={setGreeting}>Set Greeting</button>
          <input
            type="text"
            value={newGreet}
            onChange={(e) => setNewGreet(e.target.value)}
          />
        </header>
      </div>
    </>
  );
}

export default App;
