const { ethers } = require("hardhat");
const fs = require("fs");
async function main() {
  // LISTING FACTORY
  const BooksToken = await ethers.getContractFactory("BooksToken");
  const booksToken = await BooksToken.deploy("Books Token", "BOOKS");
  const booksTokenData = {
    address: booksToken.address,
    abi: JSON.parse(booksToken.interface.format("json")),
  };
  fs.writeFileSync(
    "frontend/eth/BooksToken.json",
    JSON.stringify(booksTokenData)
  );
  await booksToken.deployed();
  console.log("Books Token Deployed to :", booksToken.address);
}
[];

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
