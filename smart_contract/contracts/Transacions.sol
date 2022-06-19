//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Transactions {
    event Transfer(
        address sender,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function publishTransaction(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }
}
