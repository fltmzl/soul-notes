import { db } from "@/config/firebase";
import { AuthContext } from "@/context/AuthContext";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

const useGetNotes = () => {
  const { user, loadingAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!loadingAuth) {
      const q = query(collection(db, "notes"), where("user_id", "==", user.id), orderBy("updatedAt", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const tempData = [];
          querySnapshot.forEach((doc) => {
            tempData.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setNotes(tempData);
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [loadingAuth]);

  return { notes, loading };
};

export default useGetNotes;
