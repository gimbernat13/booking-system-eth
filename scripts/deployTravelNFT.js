const { ethers } = require("hardhat");
const fs = require("fs");
async function main() {
  // LISTING FACTORY
  const TravelNFT = await ethers.getContractFactory("TravelNFT");
  const travelNFT = await TravelNFT.deploy();
  const travelNFTData = {
    address: travelNFT.address,
    abi: JSON.parse(travelNFT.interface.format("json")),
  };
  fs.writeFileSync(
    "frontend/eth/TravelNFT.json",
    JSON.stringify(travelNFTData)
  );
  await travelNFT.deployed();
  console.log("Travel NFT Factory Deployed to :", travelNFT.address);
}
[];




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
