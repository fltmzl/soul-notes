import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

const useUpdateValue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateValue = async (collectionName, id, data) => {
    setIsLoading(true);

    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  return [updateValue, isLoading, error];
};

export default useUpdateValue;
