export const getTransactions = async () => {
  const response = await fetch("http://localhost:5001/transactions");
  if (!response.ok) {
    throw new Error("Error fetching accounts");
  }
  const data = await response.json();
  const relations = data.map((relation) => ({
    id: `transaction-${relation.id}`,
    source: `account-${relation.account_id}`,
    target: `transaction-${relation.id}`,
    customer_id: `customer-${relation.customer_id}`,
    amount_ccy: relation.amount_ccy,
    amount: relation.amount,
    tran_date: relation.tran_date,
    label: relation.tran_date,
    type: "transaction",
    swift: relation.swift,
  }));
  return relations;
};

export const getTransactionsByAccountId = async (accountId) => {
  const response = await fetch(`http://localhost:5001/transactions/account/${accountId}`);
  if (!response.ok) {
    throw new Error("Error fetching accounts");
  }
  const data = await response.json();
  const relations = data.map((relation) => ({
    id: `transaction-${relation.id}`,
    source: `account-${relation.account_id}`,
    target: `transaction-${relation.id}`,
    customer_id: `customer-${relation.customer_id}`,
    amount_ccy: relation.amount_ccy,
    amount: relation.amount,
    tran_date: relation.tran_date,
    label: relation.tran_date,
    type: "transaction",
    swift: relation.swift,
  }));
  return relations;
}

export const getTransactionsByCustomerId = async (customerId) => {
  const response = await fetch(`http://localhost:5001/transactions/customer/${customerId}`);
  if (!response.ok) {
    throw new Error("Error fetching accounts");
  }
  const data = await response.json();
  const relations = data.map((relation) => ({
    id: `transaction-${relation.id}`,
    source: `account-${relation.account_id}`,
    target: `transaction-${relation.id}`,
    customer_id: `customer-${relation.customer_id}`,
    amount_ccy: relation.amount_ccy,
    amount: relation.amount,
    tran_date: relation.tran_date,
    label: relation.tran_date,
    type: "transaction",
    swift: relation.swift,
  }));
  return relations;
}