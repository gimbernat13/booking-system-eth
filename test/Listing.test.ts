import { expect } from "chai";
import { ethers } from "hardhat";
describe("---Listing---", function () {
  let contract: any;
  beforeEach(async () => {
    const Listing = await ethers.getContractFactory("Listing");
    contract = await Listing.deploy(
      "Listing Name",
      "Listing Description",
      100,
      "ipfs-link"
    );
  });

  describe("---getListingData---", () => {
    it("gets listing data ", async () => {
      const listingData = await contract.getListingData();
      expect(listingData).to.be.not.null;
      expect(listingData).to.be.a("array");
      console.log("response ", listingData);
    });
  });

  describe("---checkAvailability---", () => {
    it("Checks specific date availability ", async () => {
      const isBooked = await contract.checkAvailability(2272022);
      expect(isBooked).to.be.not.null;
      expect(isBooked).to.be.a("boolean");
      expect(isBooked).to.equal(false);
      console.log("[isBooked] ", isBooked);
    });
  });

  describe("---Create res---", () => {
    it("gets listing data ", async () => {
      const res = await contract.createReservation(1659567073, 10, {
        value: 100,
      });
      const res1 = await contract.getAllReservations();
      console.log("[Reservations]", res1);

      expect(res).to.be.not.null;
      // expect(res).to.be.a("array");
      console.log("[Created res:]", res.hash);
    });
  });
  describe("---getAllReservations---", () => {
    it("gets listing data ", async () => {
      const res = await contract.getAllReservations();
      expect(res).to.be.not.null;
      expect(res).to.be.a("array");
      console.log("[Response:]", res);
    });
  });
});
