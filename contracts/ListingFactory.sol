// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
import "./DateTime.sol";

contract ListingFactory {
    address[] public listings;

    constructor() {}

    event CreateListing(string title);

    function createListing(
        string memory _title,
        string memory _description,
        uint256 _costPerDay,
        string memory _ipfsLink
    ) public {
        address newListing = address(
            new Listing(_title, _description, _costPerDay, _ipfsLink)
        );
        listings.push(newListing);
        emit CreateListing(_title);
    }

    function getListings() public view returns (address[] memory) {
        return listings;
    }
}

contract Listing {
    string public title;
    string public description;
    uint256 public costPerDay;
    address public manager;
    string public ipfsLink;
    string[] public _nftIDs;
    mapping(string => Date) dates;
    string[] reservationIndex;

    struct Date {
        address guestAddress;
        bool isBooked;
        uint256 totalCost;
    }

    constructor(
        string memory _title,
        string memory _description,
        uint256 _costPerDay,
        string memory _ipfsLink
    ) {
        title = _title;
        description = _description;
        costPerDay = _costPerDay;
        manager = msg.sender;
        ipfsLink = _ipfsLink;
    }


    event CreateReservation();

    // ==================== Reservation METHODS ====================

    function getListingData()
        public
        view
        returns (string memory, string memory, uint256, string memory)
    {
        return (title, description, costPerDay, ipfsLink);
    }

    function getCostPerDay() public pure returns (uint costPerDay) {
        return costPerDay;
    }

    function checkAvailability(
        string memory dateId
    ) public view returns (bool isBooked) {
        return (dates[dateId].isBooked);
    }

    function getAllReservations() public view returns (string[] memory) {
        return reservationIndex;
    }

    function createReservation(
        uint256 _startDate,
        uint256 _bookedDays
    ) public payable {
        uint256 dateTimestamp = _startDate;

        require(
            msg.value == _bookedDays * costPerDay,
            "U need to pay the correct amount"
        );
        for (uint256 i = 0; i < _bookedDays; i++) {
            string memory newDateId = generateIdByTimestamp(dateTimestamp);
            bool isBooked = dates[newDateId].isBooked;
            require(
                isBooked == false,
                "One of the chosen dates has already been booked"
            );
            if (!isBooked) {
                Date({guestAddress: msg.sender, isBooked: true, totalCost: 33});
                reservationIndex.push(newDateId);
            }
            dateTimestamp = dateTimestamp + 86400;
        }

        emit CreateReservation();

    }

    // ==================== UTILS ====================

    function generateIdByTimestamp(
        uint256 _timestamp
    ) public pure returns (string memory _dateId) {
        uint256 year;
        uint256 month;
        uint256 day;

        (day, month, year) = DateTime.timestampToDate(_timestamp);
        // u got 3 uints gotta join them
        string memory stringYear = toString(year);
        string memory stringMonth = toString(month);
        string memory stringDay = toString(day);

        if (stringLength(stringDay) < 2) {
            stringDay = string(abi.encodePacked("0", stringDay));
        }
        if (stringLength(stringMonth) < 2) {
            stringMonth = string(abi.encodePacked("0", stringMonth));
        }
        string memory dateId = string(
            abi.encodePacked(stringYear, "-", stringMonth, "-", stringDay)
        );
        return dateId;
    }

    function stringLength(string memory s) public pure returns (uint256) {
        return bytes(s).length;
    }

    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
