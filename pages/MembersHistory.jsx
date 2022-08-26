import React, { useState, useEffect } from "react";
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
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";


const MembersHistory = () => {

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filtered, setFiltered] = useState([]);
  //fetching members

  useEffect(() => {
    const reference = collection(db, "paymentHistory");
    const dbQuery = query(reference, orderBy("id", "asc"));

    onSnapshot(dbQuery, (querySnapshot) => {
      let i = 1;
       
      // Load data to Array
      setPaymentHistory(
        querySnapshot.docs.map((doc) => {
          let data = doc.data();
        
          if (doc.data().date != null) {
            data.date = data.date.toDate().toLocaleDateString("en-US");
          } else {
            console.log("else");
          }

          return {
            id: data.id,
            index: i++,
            ...data,
          };
        })
      );
    });
  
}, []);
  
  useEffect(() => {
    if(searchInput != ""){
      setFiltered(
        paymentHistory.filter(
          (data) =>
            data.name.toLowerCase().includes(searchInput.toLocaleLowerCase()) 
           
        )
      );
    } else {
      setFiltered(paymentHistory);
    }
    
  }, [searchInput, paymentHistory]);


  
  
    
    
    
  


  const columns = [
    {
      field: "name",
      headerName: "name",
      width: 300,
    },
    {
      field: "date",
      headerName: "date",
      width: 300,
    },

    {
      field: "Paid",
      headerName: "amount",
      type: "number",
      width: 100,
      hideable: false,
      headerAlign: "center",
      align: "center",
    },
  ];
  return (
    <>
      <TextField
       key={paymentHistory.index}
        style={{ width: "20%", marginTop: 50 }}
        label={"Search member"}
        variant="standard"
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        value={searchInput}
      />

      <div style={{ height: 500, width: "100%", marginTop: 70 }}>
        <DataGrid
         
          rows={filtered}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoPageSize
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default MembersHistory;
