// SPDX-License-Identifier:UNLICENSED

pragma solidity ^0.8.0;

contract Funding{

    // structure for Each Campaign
    struct Campaign{
        uint id;  //id for every campaign
        address payable reciever; // eth addresss of reciever (payable bcoz transfering eth to this account)
        address donor; // eth address of donor
        string name; 
        string description;
        uint fundingGoal; // amount to be donated
        uint raisedFunds; // fundaingGoals - fundingDonated
        bool completed; // if completed no display for that purpose
    }

    uint public campaignCount; // to update id in campaign and to map in react
    Campaign[] public campaigns; // dictionary maps int => each campaign

    
    function createCampaign(
        string memory name,
        string memory description,
        uint fundingGoal
    ) public {
        require(bytes(name).length > 0);
        require(bytes(description).length > 0);
        require(fundingGoal > 0);

        campaignCount = campaignCount + 1;

        campaigns.push(Campaign(campaignCount,
        payable(msg.sender),
        address(0),
        name,
        description,
        fundingGoal ,
        0,
        false
        ));

    }

    function donate(uint id) public payable{

        require(campaigns[id].reciever != msg.sender,"you cannot send eth");
        require(campaigns[id].completed == false,"campaign ended");
        require((msg.value) <= (campaigns[id].fundingGoal - campaigns[id].raisedFunds),"donating eth more than required");

        campaigns[id].donor = msg.sender;
        campaigns[id].raisedFunds += ((msg.value));
        payable(campaigns[id].reciever).transfer(msg.value);
        if(campaigns[id].raisedFunds<campaigns[id].fundingGoal){
            campaigns[id].completed = false;
        }else{
            campaigns[id].completed = true;
        }
 
       
    }
}