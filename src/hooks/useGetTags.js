import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

const useGetTags = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(
      query(collection(db, "tags"), where("user_id", "==", user.uid)),
      (snapshot) => {
        const tempData = [];

        snapshot.forEach((doc) => {
          tempData.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setData(tempData);
      },
      (error) => {
        setError(error);
      }
    );

    setIsLoading(false);

    return () => {
      unsubscribe();
    };
  }, [user]);

  return [data, isLoading, error];
};

export default useGetTags;
