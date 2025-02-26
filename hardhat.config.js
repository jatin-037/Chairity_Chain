require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.18", // Use your desired Solidity version
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Local Hardhat node
      // Optional: Add accounts if needed (e.g., for deployments)
      // accounts: [PRIVATE_KEY]
    },
  },
};