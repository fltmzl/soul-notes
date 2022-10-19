import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const useDeleteValue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteValue = async (collection, id) => {
    setIsLoading(true);

    try {
      await deleteDoc(doc(db, collection, id));
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  return [deleteValue, isLoading, error];
};

export default useDeleteValue;
