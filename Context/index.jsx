import { createContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";




const AppContext = createContext();

export const AppWrapper = ({ children }) => {
  const [members, setMembers] = useState([]);

  //fetching members
  
  
  const fetchMembers = () => {
    const reference = collection(db, "members");
    const dbQuery = query(reference, orderBy("lastname", "asc"));

    onSnapshot(dbQuery, (querySnapshot) => {
      let i = 1;

      // Load data to Array
      setMembers(
        querySnapshot.docs.map((doc) => {
          let data = doc.data();

          return {
            id: doc.id,
            index: i++,
            ...data,
          };
        })
      );
    });
  };

  useEffect(() => {
    fetchMembers();
    
}, []);




  let sharedState = { 
    members
  }
  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
};
export default AppContext;
