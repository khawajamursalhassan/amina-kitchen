export const getCustomerCustomerRelations = async () => {
  const response = await fetch(
    "http://localhost:5001/customer-customer-relations"
  );
  if (!response.ok) {
    throw new Error("Error fetching accounts");
  }
  const data = await response.json();
  const relations = data.map((relation) => ({
    id: `customer-customer-relation-${relation.id}`,
    source: `customer-${relation.customer1_id}`,
    target: `customer-${relation.customer2_id}`,
  }));
  return relations;
};
