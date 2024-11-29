import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Canvas from "./Canvas";
import userSvg from "../assets/images/user.svg";
import accountSvg from "../assets/images/account.svg";
import transactionSvg from "../assets/images/transaction.svg";

import { getAccounts } from "../api/accountApi";
import { getAddresses } from "../api/addressApi";
import { getCustomerAccountRelations } from "../api/customerAccountRelationApi";
import { getCustomerCustomerRelations } from "../api/customerCustomerRelationApi";
import { getCustomers } from "../api/customerApi";
import { getTransactionsByCustomerId } from "../api/transactionApi";

const Network = () => {
  const { customerId } = useParams();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [filteredNodes, setFilteredNodes] = useState([]);
  const [filteredEdges, setFilteredEdges] = useState([]);

  useEffect(() => {
    Promise.all([
      getAccounts(),
      getAddresses(),
      getCustomerAccountRelations(),
      getCustomerCustomerRelations(),
      getCustomers(),
      getTransactionsByCustomerId(customerId),
    ])
      .then(
        ([
          accounts,
          addresses,
          customerAccountRelations,
          customerCustomerRelations,
          customers,
          transactions,
        ]) => {
          const combinedNodes = [
            ...accounts,
            ...addresses,
            ...customers,
            ...transactions,
          ];
          const combinedEdges = [
            ...customerAccountRelations,
            ...customerCustomerRelations,
            ...transactions,
          ];
          setEdges(combinedEdges);
          setNodes(combinedNodes);
        }
      )
      .catch((error) =>
        console.error("Error fetching nodes and edges:", error)
      );
  }, []);

  useEffect(() => {
    if (customerId) {
      console.log(edges);
      console.log(nodes);
      const customerEdges = edges.filter(
        (edge) =>
          edge.source === `customer-${customerId}` ||
          edge.target === `customer-${customerId}` ||
          edge.customer_id === `customer-${customerId}`
      );

      const filteredNodes = nodes.filter((node) => {
        return customerEdges.some(
          (edge) => edge.source === node.id || edge.target === node.id
        );
      });

      setFilteredNodes(filteredNodes);
      setFilteredEdges(customerEdges);
    } else {
      setFilteredNodes([]);
    }
  }, [customerId, edges, nodes]);

  const addMissingDataFields = (nodes) => {
    return nodes.map((node) => {
      return {
        ...node,
        icon:
          node.type === "customer"
            ? userSvg
            : node.type === "account"
            ? accountSvg
            : node.type === "transaction"
            ? transactionSvg
            : "",
      };
    });
  };

  return (
    <div className="main-container">
      {customerId === 'null' && <p>Please select a customer</p>}
      <p>Selected Customer: {customerId}</p>
        <Canvas
          nodes={addMissingDataFields(filteredNodes)}
          edges={filteredEdges}
        />
    </div>
  );
};

export default Network;
