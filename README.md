# eth-greeter-example
Deploys Greeter contract to blockchain and requests a greeting.

## Get started
`$ brew install parity`

`$ parity`

Navigate to the Parity UI at [http://localhost:8180/](http://localhost:8180/). 
Change your network to Ropsten (Settings > Parity > 'chain/network to sync. Create 2 Ropsten 
accounts in the Accounts section.

Open `app.js` and set `myAccount` & `secondAccount` to the address of your Ropsten accounts:
```es6
// Create an account on Ropsten testnet
// Using a second account to call methods on deployed contract
const myAccount = "your account address here";
const secondAccount = "your second account address here";
```

In another terminal window, start the app:

`$ yarn install`

After you `yarn start` the app, look at the Parity UI. You should see a request to deploy a contract. Enter your password
and click CONFIRM REQUEST to sign the contract.

```bash
$ yarn start
yarn run v1.3.2
warning ../../package.json: No license field
warning ../../../package.json: No license field
$ node app.js
Attempting to deploy contract...
SUCCESS!
Contract deployed to address:
- <address contract was deployed to>
Calling say() on deployed contract...
Called say()! Response:
- bonsoir
```

If the printed response matches the argument passed into the `contract.deploy()` call, you're good!
