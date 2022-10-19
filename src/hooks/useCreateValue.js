import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

const useCreateValue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdID, setCreatedID] = useState(null);

  const createValue = async (collectionName, itemID, data) => {
    setIsLoading(true);

    try {
      await setDoc(doc(db, collectionName, itemID), data);
      setCreatedID(itemID);
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  return [createValue, isLoading, error, createdID];
};

export default useCreateValue;
