import { Link } from "react-router-dom";

export const accountColumns = [
  {
    title: "Id",
    dataIndex: "account_id",
    key: "account_id",
  },
  {
    title: "Title",
    dataIndex: "account_title",
    key: "account_title",
  },
  {
    title: "Number",
    dataIndex: "account_number",
    key: "account_number",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "See transactions",
    dataIndex: "transactions",
    key: "transactions",
    render: (text, record) => (
      <Link to={`/transaction/account/${record.account_id}`}>Transactions</Link>
    ),
  },
];
