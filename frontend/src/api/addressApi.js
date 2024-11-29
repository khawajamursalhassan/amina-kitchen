export const getAddresses = async () => {
  const response = await fetch("http://localhost:5001/addresses");
  if (!response.ok) {
    throw new Error("Error fetching accounts");
  }
  const data = await response.json();
  const relations = data.map((relation) => ({
    ...relation,
    id: `address-${relation.id}`,
    party_id: `customer-${relation.party_id}`,
    label: 'address',
    type: "address",
  }));
  return relations;
};
