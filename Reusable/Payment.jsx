import React, { useState, useContext, useEffect } from "react";
import AppContext from "../context";
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import NumberPicker from "react-widgets/NumberPicker";
import {
  addDoc,
  arrayUnion,
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

const Payment = ({ editID, credit, setCredit, handleSubmit, handle, isConfirm }) => {
  // console.log(editID)
  const { members } = useContext(AppContext);

  // const [payHistory, setPayHistory] = useState([]);

  return (
    <>
      <input
        defaultValue={0}
        type="number"
        onChange={(e) => {
          console.log(e);
          setCredit(Number(e.target.value));
        }}
        required
      />

      {isConfirm && (<Button
        onClick={() => {
          handleSubmit(editID);
        }}
      >
        Confirm amount
      </Button>)}
      <Button
        onClick={() => {
          handle(editID);
        }}
      >
        Pay
      </Button>
    </>
  );
};

export default Payment;
