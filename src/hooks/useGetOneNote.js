import { db } from "../config/firebase";
import { useAuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetOneNote = (id) => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!id) return;

    const getNote = async () => {
      const docRef = doc(db, "notes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData({
          id: docSnap.id,
          ...docSnap.data(),
        });
        setIsLoading(false);
      } else {
        setError({ code: 404, message: "not-found" });
        setIsLoading(false);
      }
    };

    getNote();
  }, [id]);

  return [data, isLoading, error];
};

export default useGetOneNote;
