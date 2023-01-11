 // LISTING
 const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const Listing = await ethers.getContractFactory("Listing");
    const listing = await Listing.deploy(
      "Putas",
      "negras ",
      666,
      "links are nice"
    );
   
    const listingData = {
      abi: JSON.parse(listing.interface.format("json")),
    };
    fs.writeFileSync("frontend/eth/Listing.json", JSON.stringify(listingData));
    await listingFactory.deployed();
    await listing.deployed();
    console.log("Listing  Deployed to :", listingFactory.address);
    console.log("Listing  to  :", listing.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  
