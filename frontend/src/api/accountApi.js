export const getAccounts = async () => {
  const response = await fetch("http://localhost:5001/accounts");
  if (!response.ok) {
    throw new Error("Error fetching accounts");
  }
  const data = await response.json();
  const relations = data.map((relation) => ({
    ...relation,
    account_id: `account-${relation.account_id}`,
    id: `account-${relation.account_id}`,
    label: relation.account_title,
    type: "account",
  }));
  return relations;
};

export const getAccountById = async (accountId) => {
  const response = await fetch(`http://localhost:5001/accounts/${accountId}`);
  if (!response.ok) {
    throw new Error("Error fetching accounts");
  }
  const data = await response.json();
  return data;
};