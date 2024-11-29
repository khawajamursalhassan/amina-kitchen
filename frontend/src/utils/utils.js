import OrderingcustomerIcon from "../assets/images/orderingcustomer.svg";
import BeneficiaryIcon from "../assets/images/beneficiary.svg";
import IntermediaryIcon from "../assets/images/intermediary.svg";
import CorrespondentIcon from "../assets/images/correspondent.svg";
import BankIcon from "../assets/images/bank.svg";

const getTransactionType = (transaction) => {
  if (transaction.swift.type === "MT103") {
    return "MT103";
  } else if (transaction.swift.type === "PAC_009") {
    return "PAC_009";
  }
  return "MT202Cover";
};

const handleMT103 = (transaction, nodes, edges) => {
  const { swift, id } = transaction;
  const {
    ordering_customer,
    beneficiary,
    ordering_institution,
    sender_correspondent,
    receiver_correspondent,
    intermediary,
    account_with_institution,
  } = swift || {};

  if (!beneficiary) return;

  nodes.push({
    id: ordering_customer,
    label: ordering_customer,
    image: OrderingcustomerIcon,
  });

  nodes.push({
    id: beneficiary,
    label: beneficiary,
    image: BeneficiaryIcon,
  });

  edges.push({
    from: ordering_customer,
    to: ordering_institution,
    id: `edge-${id}-ordering_customer-ordering_institution`,
    // label: "ordering_customer-ordering_institution",
  });

  edges.push({
    from: ordering_institution,
    to: sender_correspondent,
    id: `edge-${id}-ordering_institution-sender_correspondent`,
    // label: "ordering_institution-sender_correspondent",
  });

  edges.push({
    from: sender_correspondent,
    to: receiver_correspondent,
    id: `edge-${id}-sender_correspondent-receiver_correspondent`,
    // label: "sender_correspondent-receiver_correspondent",
  });

  edges.push({
    from: receiver_correspondent,
    to: intermediary,
    id: `edge-${id}-receiver_correspondent-intermediary`,
    // label: "receiver_correspondent-intermediary",
  });

  edges.push({
    from: intermediary,
    to: account_with_institution,
    id: `edge-${id}-intermediary-account_with_institution`,
    // label: "intermediary-account_with_institution",
  });

  edges.push({
    from: account_with_institution,
    to: beneficiary,
    id: `edge-${id}-account_with_institution-beneficiary`,
    // label: "account_with_institution-beneficiary",
  });
};

const handleMT202Cover = (transaction, nodes, edges) => {
  const { swift, id } = transaction;
  const {
    beneficiary_institution,
    ordering_institution,
    sender_correspondent,
    receiver_correspondent,
    intermediary,
    account_with_institution,
  } = swift || {};

  nodes.push({
    id: beneficiary_institution,
    label: beneficiary_institution,
    image: BeneficiaryIcon,
  });

  edges.push({
    from: ordering_institution,
    to: sender_correspondent,
    id: `edge-${id}-ordering_institution-sender_correspondent`,
    // label: "ordering_institution-sender_correspondent",
  });

  edges.push({
    from: sender_correspondent,
    to: receiver_correspondent,
    id: `edge-${id}-sender_correspondent-receiver_correspondent`,
    // label: "sender_correspondent-receiver_correspondent",
  });

  edges.push({
    from: receiver_correspondent,
    to: intermediary,
    id: `edge-${id}-receiver_correspondent-intermediary`,
    // label: "receiver_correspondent-intermediary",
  });

  edges.push({
    from: intermediary,
    to: account_with_institution,
    id: `edge-${id}-intermediary-account_with_institution`,
    // label: "intermediary-account_with_institution",
  });

  edges.push({
    from: account_with_institution,
    to: beneficiary_institution,
    id: `edge-${id}-account_with_institution-beneficiary_institution`,
    // label: "account_with_institution-beneficiary_institution",
  });

  return { nodes, edges };
};

const handlePAC_009 = (transaction, nodes, edges) => {
  const { swift, id } = transaction;
  const { DbtrNm, DbtrAgtBICFI, CdtrAgtBICFI, CdtrNm, InstgAgtBICFI, InstdAgtBICFI } = swift || {};

  nodes.push({
    id: DbtrNm,
    label: DbtrNm,
    image: OrderingcustomerIcon,
  });

  nodes.push({
    id: DbtrAgtBICFI,
    label: DbtrAgtBICFI,
    image: BankIcon,
  });

  nodes.push({
    id: InstgAgtBICFI,
    label: InstgAgtBICFI,
    image: BankIcon,
  });

  nodes.push({
    id: InstdAgtBICFI,
    label: InstdAgtBICFI,
    image: BankIcon,
  });

  nodes.push({
    id: CdtrNm,
    label: CdtrNm,
    image: BeneficiaryIcon,
  });

  nodes.push({
    id: CdtrAgtBICFI,
    label: CdtrAgtBICFI,
    image: BankIcon,
  });

  edges.push({
    from: DbtrNm,
    to: DbtrAgtBICFI,
    id: `edge-${id}-DbtrNm-DbtrAgtBICFI`,
    // label: "DbtrNm-DbtrAgtBICFI",
  });

  edges.push({
    from: DbtrAgtBICFI,
    to: InstgAgtBICFI,
    id: `edge-${id}-DbtrAgtBICFI-InstgAgtBICFI`,
    // label: "DbtrAgtBICFI-InstgAgtBICFI",
  });

  edges.push({
    from: InstgAgtBICFI,
    to: InstdAgtBICFI,
    id: `edge-${id}-InstgAgtBICFI-InstdAgtBICFI`,
    // label: "InstgAgtBICFI-InstdAgtBICFI",
  });

  edges.push({
    from: InstdAgtBICFI,
    to: CdtrAgtBICFI,
    id: `edge-${id}-InstdAgtBICFI-CdtrAgtBICFI`,
    // label: "InstdAgtBICFI-CdtrAgtBICFI",
  });

  edges.push({
    from: CdtrAgtBICFI,
    to: CdtrNm,
    id: `edge-${id}-CdtrAgtBICFI-CdtrNm`,
    // label: "CdtrAgtBICFI-CdtrNm",
  });

  return { nodes, edges };
};
export const makeGraphNodesAndEdges = (transaction) => {
  const nodes = [];
  const edges = [];

  const type = getTransactionType(transaction);

  if (type === "MT103") {
    handleMT103(transaction, nodes, edges);
  } else if (type === "MT202Cover") {
    handleMT202Cover(transaction, nodes, edges);
  } else if (type === "PAC_009") {
    handlePAC_009(transaction, nodes, edges);
    return { nodes, edges };
  } else {
    return;
  }
  const { swift, id } = transaction;
  const {
    ordering_institution,
    sender_correspondent,
    receiver_correspondent,
    intermediary,
    account_with_institution,
  } = swift || {};

  nodes.push({
    id: ordering_institution,
    label: ordering_institution,
    image: BankIcon,
  });
  nodes.push({
    id: sender_correspondent,
    label: sender_correspondent,
    image: CorrespondentIcon,
  });
  nodes.push({
    id: intermediary,
    label: intermediary,
    image: IntermediaryIcon,
  });
  nodes.push({
    id: receiver_correspondent,
    label: receiver_correspondent,
    image: CorrespondentIcon,
  });
  nodes.push({
    id: account_with_institution,
    label: account_with_institution,
    image: BankIcon,
  });

  return { nodes, edges };
};
