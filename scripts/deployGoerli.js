
const { ethers } = require("hardhat");
const fs = require("fs");


async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const ListingFactory = await ethers.getContractFactory("ListingFactory");
    const listingFactory = await ListingFactory.deploy();
    const listingFactoryData = {
      address: listingFactory.address,
      abi: JSON.parse(listingFactory.interface.format("json")),
    };
    fs.writeFileSync(
      "frontend/eth/ListingFactory.json",
      JSON.stringify(listingFactoryData)
    );
    await listingFactory.deployed();
    console.log("Listing Factory Deployed to Goerli:", listingFactory.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });