export const getCustomerAccountRelations = async () => {
  const response = await fetch(
    "http://localhost:5001/customer-account-relations"
  );
  if (!response.ok) {
    throw new Error("Error fetching customer-account relations");
  }
  const data = await response.json();
  const relations = data.map((relation) => ({
    id: `customer-account-relation-${relation.id}`,
    source: `customer-${relation.customer_id}`,
    target: `account-${relation.account_id}`,
    relation_start_date: relation.relation_start_date,
    label: 'c-to-a',
  }));
  return relations;
};

//get customer account relation by customer id
export const getCustomerAccountRelationByCustomerId = async (customerId) => {
  const response = await fetch(
    `http://localhost:5001/customer-account-relations/customer/${customerId}`
  );
  if (!response.ok) {
    throw new Error("Error fetching customer-account relations");
  }
  const data = await response.json();
  const relations = data.map((relation) => ({
    id: `customer-account-relation-${relation.id}`,
    source: `customer-${relation.customer_id}`,
    target: `account-${relation.account_id}`,
    relation_start_date: relation.relation_start_date,
    account_id: relation.account_id,
    customer_id: relation.customer_id,
    label: 'c-to-a',
  }));
  return relations;
};