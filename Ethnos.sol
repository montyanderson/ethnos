pragma solidity ^0.4.10;

contract Ethnos {
    struct File {
        uint64 mimeType;
        uint8 compression;
        bytes data;
    }

    mapping(string => address) domains;
    mapping(address => mapping(string => File)) sites;

    address owner;
    uint domainPrice;

    function Ethnos(uint _domainPrice) {
        owner = msg.sender;
        domainPrice = _domainPrice;
    }

    /* Domains */

    function setDomainPrice(uint _domainPrice) external {
        if(msg.sender != owner) throw;
        domainPrice = _domainPrice;
    }

    function getDomainPrice() external returns (uint) {
        return domainPrice;
    }

    function collectFunds() external {
        if(msg.sender != owner) throw;
        owner.transfer(this.balance);
    }

    function registerDomain(string name) external payable {
        if(domains[name] != address(0) || msg.value < domainPrice) {
            throw;
        }

        domains[name] = msg.sender;
    }

    function resolveDomain(string name) external constant returns (address) {
        return domains[name];
    }

    /* Files */

    function updateFile(string fileName, uint8 compression, uint64 mimeType, bytes data) external {
        var file = sites[msg.sender][fileName];

        file.compression = compression;
        file.mimeType = mimeType;
        file.data = data;
    }

    function updateFileMimeType(string fileName, uint64 mimeType) external {
        sites[msg.sender][fileName].mimeType = mimeType;
    }

    function getFile(address site, string fileName) external constant returns (uint8 compression, uint64 mimeType, bytes data) {
        var file = sites[site][fileName];
        return (file.compression, file.mimeType, file.data);
    }
}
