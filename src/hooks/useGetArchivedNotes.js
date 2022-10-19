import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

const useGetArchivedNotes = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(
      query(collection(db, "notes"), where("collaborators", "array-contains", user.uid), orderBy("updatedAt", "desc")),
      (snapshot) => {
        const tempData = [];

        snapshot.forEach((doc) => {
          const archivedObject = doc.data().details[user.uid];
          const isArchived = archivedObject?.archived;

          if (isArchived) {
            tempData.push({
              id: doc.id,
              ...doc.data(),
            });
          }
        });

        setData(tempData);
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user]);

  return [data, isLoading, error];
};

export default useGetArchivedNotes;
