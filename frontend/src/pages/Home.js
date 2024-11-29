import React, { useState } from "react";
import { Button, Input, Table, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { getCustomerById } from "../api/customerApi";
import { getAccountById } from "../api/accountApi";
import { getCustomerAccountRelationByCustomerId } from "../api/customerAccountRelationApi";
import { accountColumns } from "./constants";

export default function Home() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState([]);
  const [showAccounts, setShowAccounts] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("customer_id");

  const handleNetworkNavigation = (record) => {
    navigate(`/company/customer/${record.customer_id}`);
  };

  const handleDashboardkNavigation = (record) => {
    navigate(`/pages/Dashboard/${record.customer_id}`);
  };

  const getCustomerAccounts = (record) => {
    setSelectedAccount([]);
    const numericValue = parseInt(record.customer_id);
    getCustomerAccountRelationByCustomerId(numericValue).then((relations) => {
      relations.forEach((relation) => {
        console.log(relation);
        getAccountById(relation.account_id).then((account) => {
          console.log(account);
          if (account.account_id) {
            setSelectedAccount((prev) => [...prev, account]);
          }
        });
      });
    });

    setShowAccounts(true);
  };

  const handleSearch = () => {
    if (!searchValue) {
      return;
    }
    setShowAccounts(false);
    const numericValue = parseInt(searchValue);
    if (searchCriteria === "customer_id") {
      getCustomerById(numericValue).then((customer) => {
        if (customer.message) {
          alert(customer.message);
          return;
        }
        setSelectedCustomers([customer]);
        setAccounts([]);
      });
    } else if (searchCriteria === "account_id") {
      getAccountById(numericValue).then((account) => {
        if (account.message) {
          alert(account.message);
          return;
        }
        setSelectedCustomers([]);
        setAccounts([account]);
      });
    }
  };

  const customerColumns = [
    {
      title: "Id",
      dataIndex: "customer_id",
      key: "customer_id",
    },
    {
      title: "Name",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "See Network",
      dataIndex: "network",
      key: "network",
      render: (text, record) => (
        <Button onClick={() => handleNetworkNavigation(record)}>Network</Button>
      ),
    },
    {
      title: "See Accounts",
      dataIndex: "account",
      key: "account",
      render: (text, record) => (
        <Button onClick={() => getCustomerAccounts(record)}>
          See Account Details
        </Button>
      ),
    },

    {
      title: "See Dashboard",
      dataIndex: "dashboard",
      key: "dashboard",
      render: (text, record) => (
        <Button onClick={() => handleDashboardkNavigation(record)}>
          Financial Dashboard
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to Our Company</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input
          style={{ width: "400px" }}
          width={100}
          placeholder="Search by customer id or account id"
          onBlur={(e) => setSearchValue(e.target.value)}
        />
        <Radio.Group
          style={{ marginLeft: "10px" }}
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
        >
          <Radio value="customer_id">Customer ID</Radio>
          <Radio value="account_id">Account ID</Radio>
        </Radio.Group>
        <Button
          onClick={handleSearch}
          style={{
            backgroundColor: "blue",
            color: "white",
            marginLeft: "10px",
          }}
        >
          Search
        </Button>
      </div>
      {selectedCustomers.length > 0 && (
        <>
          <h1>Customers List</h1>
          <Table dataSource={selectedCustomers} columns={customerColumns} />
        </>
      )}
      {accounts.length > 0 && (
        <>
          <h1>Accounts List</h1>
          <Table dataSource={accounts} columns={accountColumns} />
        </>
      )}
      {showAccounts && selectedCustomers.length > 0 && (
        <>
          <h1>Customer Accounts List</h1>
          <Table dataSource={selectedAccount} columns={accountColumns} />
        </>
      )}
      
     
    </div>
    
  );
}
