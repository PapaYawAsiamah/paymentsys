import React from "react";
import { useContext, useState } from "react";
import AppContext from "../context";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { Add, Delete, Edit, Search } from "@mui/icons-material";
import MembersForm from "../Reusable/MembersForm";
import { DataGrid } from "@mui/x-data-grid";
import Payment from "../Reusable/Payment";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  documentId,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Cookies from "js-cookie";
import { useRouter } from 'next/router'


const Members = () => {
  const logout = () => {
     Cookies.remove("loggedin");
     router.push("/")
  }
  const router = useRouter();
  const { members } = useContext(AppContext);
  const defaultValues = {
    lastname: "",
    firstname: "",
    othernames: "",
    paid: 0,
    Date: [],
  };
  const [member, setMember] = useState(defaultValues);
  const [open, setOpen] = useState(false);
  const [payBox, setPayBox] = useState(false);
  const [sumed, setSumed] = useState();
  const [credit, setCredit] = useState(0);
  const [editID, setEditID] = useState();
  const [confirm, setConfirm] = useState(false);
  const [isConfirm, setIsConfirm] = useState(true);


  const handleClickOpen = () => {
    //  Clear Field when adding new details

    setMember(defaultValues);

    setOpen(true);
  };

  const handleSubmit = async (id) => {
    setIsConfirm(false);
    setConfirm(true);
    const index = members.findIndex((member) => member.id === id);
    const membersRef = doc(db, "members", editID);
    // console.log(members[index].paid)
    const sub = members[index].amount - members[index].paid;
    await updateDoc(membersRef, { paid: credit });

    // const memberAmount = members[index].amount;
    // const array = members[index].paid;
  };
  const handle = async (id) => {
    if (confirm) {
      const index = members.findIndex((member) => member.id === id);
      const membersRef = doc(db, "members", editID);
      const sub = members[index].amount - members[index].paid;
      await updateDoc(membersRef, { amount: sub });
      setPayBox(false);
      setConfirm(false);
      const historyRef = collection(db, "paymentHistory");


   

      let mI = Date.now();
      
      const docRef = await addDoc(historyRef, {
        name: `${members[index].firstname || ""} ${
          members[index].othernames || ""
        } ${members[index].lastname || ""}`,
        id:  mI,
        date: serverTimestamp(),
        Paid: credit,
      });
    } else alert("please confirm amount");
  };

  const handleClose = () => {
    // Set Edit variable to false

    // Set Modal Variable to false (It closes the Modal/Dialog)
    setOpen(false);
  };

  const pay = (id) => {
    setEditID(id);
    setPayBox(true);
    setIsConfirm(true);

    // const index = members.findIndex((member) => member.id === id);
    // setPaid(members[index].paid);
    // console.log(members[index].amount)
  };

  //table
  const columns = [
    {
      field: "full_name",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 0.5,
      valueGetter: (params) =>
        `${params.row.lastname || ""} ${params.row.firstname || ""} ${
          params.row.othernames || ""
        }`,
      hideable: false,
    },

    {
      field: "amount",
      headerName: "amount due",
      type: "number",
      width: 500,
      hideable: false,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "button",
      headerName: "",
      width: 180,
      hideable: false,
      width: 180,

      renderCell: (cellValues) => {
        return (
          <>
            <Button
              variant="contained"
              onClick={() => {
                pay(cellValues.id);
              }}
            >
              Pay
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ marginTop: 20 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleClickOpen(true)}
        >
          member
        </Button>

        <MembersForm
          setMember={setMember}
          member={member}
          setdialog={setOpen}
          open={open}
          handleClose={handleClose}
          title
        />
      </div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={members}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoPageSize
          disableSelectionOnClick
        />
      </div>
      {payBox && (
        <Payment
          editID={editID}
          credit={credit}
          setCredit={setCredit}
          handleSubmit={handleSubmit}
          handle={handle}
          isConfirm={isConfirm}
          setIsConfirm={setIsConfirm}
        />
      )}
      <button onClick={() => {logout()}}>logout</button>
    </>
  );
};

export default Members;
