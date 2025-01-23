import React from "react";
import { useNavigate } from "react-router-dom";

const TransactionSelector = () => {
  const navigate = useNavigate();

  const handleTransactionChange = (event) => {
    const selectedValue = event.target.value;
    console.log("Valeur sélectionnée :", selectedValue); // Log pour vérifier
    navigate(selectedValue === "rent" ? "/louer" : "/vendre");
  };
  
 

  return (
    <select onChange={handleTransactionChange} className="select-style">
      <option value="sale">À vendre</option>
      <option value="rent">À louer</option>
    </select>
  );
};

export default TransactionSelector;
