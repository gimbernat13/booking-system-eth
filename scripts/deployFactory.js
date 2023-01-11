const { ethers } = require("hardhat");
const fs = require("fs");
async function main() {
  // LISTING FACTORY
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
  console.log("Listing Factory Deployed to :", listingFactory.address);
}
[];

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
