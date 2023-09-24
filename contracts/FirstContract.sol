// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract FirstContract {
    string private _greeting = "Hello, World!";
    address private _owner;
    string public hey;

    constructor() {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == _owner,
            "Ownable: caller is not the owner"
        );
        _;
    }

    function greet() public view returns(string memory) {
        return _greeting;
    }

    function setGreeting(string calldata greeting) external onlyOwner {
        _greeting = greeting;
    }

    function owner() public view returns(address) {
        return _owner;
    }
}
