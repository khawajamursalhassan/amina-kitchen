import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VisNetwork from "../components/VisNetwork";
import { getTransactionsByAccountId } from "../api/transactionApi";
import { makeGraphNodesAndEdges } from "../utils/utils";
import { Button } from "antd";

const Transaction = () => {
  const { accountId } = useParams();

  const [transactions, setTransactions] = useState([]);
  const [transactionInfo, setTransactionInfo] = useState(null);
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [showSwiftInfo, setShowSwiftInfo] = useState(false);
  const [swiftInfo, setSwiftInfo] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    Promise.all([getTransactionsByAccountId(accountId)])
      .then(([transactions]) => {
        setTransactions(transactions);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [accountId]);

  const handleTransactionInfo = (transaction) => {
    setActiveTransaction(transaction);
    setShowSwiftInfo(false);
  };

  const handleSwiftInfo = (transaction) => {
    const swiftMessage = transaction.swift;
    return () => {
      setSwiftInfo(swiftMessage);
      setShowSwiftInfo(true);
    };
  };

  useEffect(() => {
    if (activeTransaction) {
      if (activeTransaction?.swift) {
        setTransactionInfo(activeTransaction.swift);
      } else {
        setTransactionInfo(null);
      }
      const result = makeGraphNodesAndEdges(activeTransaction);

      setNodes(result.nodes);
      setEdges(result.edges);
    }
  }, [activeTransaction, transactions]);

  return (
    <div className="transaction-page">
      <h1>Transactions for account ID: {accountId}</h1>

      <div className="transaction-list">
        <h2>Select...</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <Button
                type="primary"
                onClick={() => handleTransactionInfo(transaction)}
                className={
                  activeTransaction && activeTransaction.id === transaction.id
                    ? "active"
                    : ""
                }
              >
                Transaction ID: {transaction.id}
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                type="default"
                onClick={handleSwiftInfo(transaction)}
              >
                Swift Info
              </Button>
            </li>
          ))}
        </ul>
      </div>
      {!showSwiftInfo && transactionInfo && (
        <div style={{ border: "1px solid black", marginTop: "10px" }}>
          <VisNetwork nodes={nodes} edges={edges} />
        </div>
      )}
      {showSwiftInfo && (
        <div className="">
          <div className="filtered-transactions">
            <h2>Swift Message</h2>
            <ul>
              {Object.entries(swiftInfo).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
