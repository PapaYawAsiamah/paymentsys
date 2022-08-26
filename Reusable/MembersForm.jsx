import { async } from "@firebase/util";
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
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
import React, { useState, useContext, useEffect } from "react";
import { db } from "../firebase";
// import AppContext from "../Context";
import "react-widgets/styles.css";
import NumberPicker from "react-widgets/NumberPicker";


const MemebersForm = ({ open, handleClose, setMember, member }) => {
  const [members, setMembers] = useState([]);
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

  const submitForm = async (e) => {
    e.preventDefault();

    const membersRef = collection(db, "members");
    await addDoc(membersRef, {
      ...member,
    })
      .then(() => {
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };


  
  

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth>
        <DialogTitle>Add member</DialogTitle>

        <DialogContent>
          <div style={{ width: "100%" }}>
            <form onSubmit={submitForm} id="studentForm">
              <Box
                sx={{
                  display: "flex",
                  "& .MuiTextField-root": { m: 1, width: "40ch" },
                }}
              >
                <TextField
                  id="lastname"
                  label="Last Name"
                  margin="normal"
                  value={member.lastname}
                  required
                  onChange={(e) =>
                    setMember({ ...member, lastname: e.target.value })
                  }
                />
                <TextField
                  label="First Name"
                  margin="normal"
                  value={member.firstname}
                  onChange={(e) =>
                    setMember({ ...member, firstname: e.target.value })
                  }
                  required
                />
                <TextField
                  label="other names"
                  margin="normal"
                  value={member.othernames}
                  onChange={(e) =>
                    setMember({ ...member, othernames: e.target.value })
                  }
                  required
                />
                <NumberPicker
                  value={member.amount}
                  defaultValue={1.4}
                  format={{ style: "currency", currency: "CED" }}
                  onChange={(e) => setMember({ ...member, amount: e })}
                  required
                />
                ;
              </Box>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>

          <Button type={"submit"} form="studentForm">
            add
          </Button>
        </DialogActions>
      </Dialog>




    </>
  );
};
export default MemebersForm;
