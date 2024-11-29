export const getCustomers = async () => {
  const response = await fetch("http://localhost:5001/customers");
  if (!response.ok) {
    throw new Error("Error fetching accounts");
  }
  const data = await response.json();
  const relations = data.map((relation) => ({
    ...relation,
    customer_id: `customer-${relation.customer_id}`,
    id: `customer-${relation.customer_id}`,
    label: relation.customer_name,
    type: "customer",
  }));
  return relations;
};
//get customer by id
export const getCustomerById = async (customerId) => {
  const response = await fetch(`http://localhost:5001/customers/${customerId}`);
  if (!response.ok) {
    throw new Error("Error fetching accounts");
  }
  const data = await response.json();
  return data;
};