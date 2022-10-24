# Hardhat Project

In order to deploy contract you need to add .env file with following configuration:

```shell
INFURA_API_KEY=""
GOERLI_PRIVATE_KEY=""
ETHERSCAN_API_KEY=""
PRIVATE_KEY=""
HARDHAT_PRIVATE_KEY=""
```
Contract deployed on Goerli with address: 0x5fD9680E133631E2fA11f34fC963E28c27A4C299

In order to use the interact scripts (for local env.), do the following:
-Start hardhat node: npx hardhat node
-Deploy contract on hh node with: npx hardhat deploy-local --network localhost
-Run script: npx hardhat interact

In order to use interact-testnet-script, do the following:
-Since contract is deployed just run: npx hardhat interact-testnet-script.
