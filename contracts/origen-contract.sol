// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InfoRegistry {
    struct Info {
        string name;
        string category;
        string description;
        string location;
    }

    mapping(uint32 => Info) private infos;
    uint32[] private ids;

    uint32 internal currentId;

    function storeData(string memory _name, string memory _category,  string memory _description, string memory _location) public returns (uint32) {
        infos[currentId] = Info(_name, _category, _description, _location);
        ids.push(currentId);
        currentId++;
        return ids[currentId-1];
    }

    function getData(uint32 id) public view returns (string memory, string memory, string memory, string memory) {
        Info storage info = infos[id];
        return (info.name, info.category, info.description, info.location);
    }
}
