const Web3 = require('web3');
const fs = require('fs');

// Create an account on Ropsten testnet
// Using a second account to call methods on deployed contract
const myAccount = "your account address here";
const secondAccount = "your second account address here";

// Start Parity locally and connect via RPC
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Compile with solc:
// solc Greeter.sol --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc > contracts.json
const source = fs.readFileSync("contracts.json");
const contracts = JSON.parse(source)["contracts"];
const compiledContract = contracts['Greeter.sol:greeter'];

// grab artifacts
const abiJSON = JSON.parse(compiledContract.abi);
const evmBytecode = '0x' + compiledContract.bin;

//TODO: sign this contract without Parity UI
const contract = new web3.eth.Contract(abiJSON, "", {
    from: myAccount,
    data: evmBytecode
});

// Initialize with constructor arguments and send to blockchain
const myMessage = "bonsoir";
console.log("Attempting to deploy contract...");
contract.deploy({
    arguments: [myMessage]
})
.send()
.then(res => {
    console.log("SUCCESS!")
    const deployedAddress = res._address;
    const deployedContract = new web3.eth.Contract(abiJSON, deployedAddress);

    console.log("Contract deployed to address:");
    console.log("- " + deployedAddress)

    console.log("Calling say() on deployed contract...");
    return deployedContract.methods.say().call({from: secondAccount})
})
.then(res => {
    console.log("Called say()! Response:")
    console.log("- " + res)

    // expect(res === myMessage)
})
.catch(err => {
    console.log("ERROR!")
    console.log("- " + err)
})