import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthContext";

const List = ({ allUsers }) => {
  const { getAllUsers } = useAuth();
  const [userList, setUserList] = useState();
  async function fetchAllUsers() {
    try {
      let snapshot = await getAllUsers();
      let list = []
      snapshot.forEach((obj) => {
        list.push(obj.data())
      })
      setUserList(list)
      console.log(userList)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (allUsers) {
      fetchAllUsers()
    }

  }, [])

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"></TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Contact Number</TableCell>
            <TableCell className="tableCell">Department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList && userList.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="tableCell">{user.name}</TableCell>
              <TableCell className="tableCell">{user.email}</TableCell>
              <TableCell className="tableCell">{user.phoneNumber}</TableCell>
              <TableCell className="tableCell">{user.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
