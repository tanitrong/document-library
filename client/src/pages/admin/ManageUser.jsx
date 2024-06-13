import React, { useEffect, useState } from "react";
import ActionManage from "../../components/admin/ActionManage";
import Header from "../../components/admin/Header";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/admin/TableAdmin";
import axiosInstance from "../../api/axios";
import { server } from "../../server";
const ManageUser = () => {
  const header = ["User", "Phone", "Plan", "Join date", "Status"];
  const [allUser, setAllUser] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  useEffect(() => {
    const getAllUser = async () => {
      const { data } = await axiosInstance.get(
        `${server}/user/get-all-user?status=${statusFilter}`
      );
      setAllUser(data.users);
    };
    getAllUser();
  }, [statusFilter]);
  return (
    <>
      <Container>
        <ActionManage />
        <div className="manage-user">
          <Header />
          <div className="session-chat">
            <span style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="search user"
                className="filter-user"
                width="600px"
              />
              <FaSearch
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "30px",
                  color: "#888888",
                }}
              />
            </span>

            <select className="filter-user" name="all-user" id="all-user">
              <option>-all user-</option>
              <option>user active</option>
              <option>user inactive</option>
            </select>
            <select
              className="filter-user"
              name="user-upgrade"
              id="user-upgrade"
            >
              <option>select plan</option>
              <option>Saving</option>
              <option>Basic</option>
              <option>Value</option>
              <option>Premium</option>
            </select>
            {allUser && <Table header={header} data={allUser} />}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ManageUser;
const Container = styled.div`
  background-color: #f8f7fa;
  display: flex;
  gap: 20px;
  width: 100vw;
  .manage-user {
    margin-left: 170px;
    width: 77.9%;
  }
  .session-chat {
    box-sizing: border-box;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.12);
    background-color: #fff;
    margin-top: 34px;
    height: 843px;
    .filter-user {
      padding: 10px 100px 10px 10px;
      margin-right: 20px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }
`;
