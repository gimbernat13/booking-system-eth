import { expect } from "chai";
import { ethers } from "hardhat";
describe("---ListingFactory---", function () {
  let contract: any;
  beforeEach(async () => {
    const ListingFactory = await ethers.getContractFactory("ListingFactory");
    contract = await ListingFactory.deploy();
  });

  describe("getListings", () => {
    it("Should return array of Listings ", async function () {
      await contract.deployed();
      const listings = await contract.getListings();
      console.log("[Listings]", listings);
      expect(listings).to.be.not.undefined;
      expect(listings).to.be.not.null;
      expect(listings).to.be.a("array");
    });
  });

  describe("createListing", () => {
    it("Creates a Listing", async function () {
      await contract.deployed();
      const response = await contract.createListing(
        "Reservation Name ",
        "Description",
        666,
        "ipfshash"
      );

      const listings = await contract.getListings();
      console.log("✅[Listings]", listings);
      console.log("✅[Hash]     ", response.hash);
      expect(response).to.be.not.undefined;
      expect(response).to.be.not.null;
      expect(response.hash).to.be.a("string");
    });
  });
});
