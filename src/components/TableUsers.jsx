import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axiosClient from "../api/axiosClient";

function TableUsers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        //Get 10 user from api
        const res = await axiosClient.get(`?page=${page}&results=10`);
        setUsers(res.data.results);
      } catch (error) {
        console.log("Failed to fetch user", error);
      }
    })();
  }, [page]);

  users?.sort((a, b) => a.login.username.localeCompare(b.login.username));

  //Create pagination
  let items = [];
  for (let number = 1; number <= 10; number++) {
    items.push(
      <Pagination.Item onClick={() => setPage(number)} key={number} active={number === page}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="container mt-5">
      <Table bordered hover>
        <thead>
          <tr className="text-center">
            <th>No</th>
            <th>Full Name</th>
            <th>User Name</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody id="userTable">
          {users?.map((user, index) => (
            <tr key={user.login.uuid}>
              <td className="align-middle text-center">{(page - 1) * 10 + (index + 1)}</td>
              <td className="align-middle">{`${user.name.title} ${user.name.first}  ${user.name.last}`}</td>
              <td className="align-middle">{user.login.username}</td>
              <td className="text-center align-middle">
                <img
                  src={user.picture.thumbnail}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                  className="rounded-circle"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        <Pagination>{items}</Pagination>
      </div>
    </div>
  );
}

export default TableUsers;
