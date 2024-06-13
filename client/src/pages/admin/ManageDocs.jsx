import { useEffect, useState } from "react";
import "../../styles/admin/ManageDocs.scss";
import ActionManage from "../../components/admin/ActionManage";
import Header from "../../components/admin/Header";
import Sesion from "../../components/admin/Sesion";
import { BsGrid } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrValidate } from "react-icons/gr";
import { HiOutlineBan } from "react-icons/hi";
import Table from "../../components/admin/TableAdmin.jsx";
import axios from "axios";
import { server } from "../../../src/server";

const ManageDocs = () => {
  const header = ["Name", "User", "Fees", "Upload date", "status"];
  const [allDocs, setAllDocs] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  console.log("alldoc", allDocs);
  const [statusFilter, setStatusFilter] = useState("All");
  useEffect(() => {
    const getAllDocs = async () => {
      const { data } = await axios.get(
        `${server}/doc/get-all-docs?status=${statusFilter}`
      );
      setAllDocs(data.documents);
    };
    getAllDocs();
  }, [statusFilter]);

  useEffect(() => {
    (async () => {
      await axios.get(`${server}/doc/search/?q=${searchResult}`).then((res) => {
        if (!searchResult) {
          axios
            .get(`${server}/doc/get-all-docs?status=${statusFilter}`)
            .then((res) => {
              setAllDocs(res.data.documents);
            });
        }
        setAllDocs(res.data);
      });
    })();
  }, [searchResult, statusFilter]);
  console.log("search result", searchResult);
  return (
    <>
      <div className="manage-page">
        <ActionManage />
        <div className="p2">
          <Header />
          <Sesion />
          <div className="document-session">
            <div className="filter-docs dflex-between">
              <div style={{ display: "flex", gap: "20px" }}>
                <button
                  className={`btn-filter ${
                    statusFilter === "All" ? "active" : ""
                  }`}
                  onClick={() => setStatusFilter("All")}
                >
                  <BsGrid className="icon-filter" />
                  All docs
                </button>
                <button
                  className={`btn-filter ${
                    statusFilter === "Processing" ? "active" : ""
                  }`}
                  onClick={() => setStatusFilter("Processing")}
                >
                  <MdOutlinePendingActions className="icon-filter" />
                  Processing
                </button>
                <button
                  className={`btn-filter ${
                    statusFilter === "Approved" ? "active" : ""
                  }`}
                  onClick={() => setStatusFilter("Approved")}
                >
                  <GrValidate className="icon-filter" />
                  Approved
                </button>
                <button
                  className={`btn-filter ${
                    statusFilter === "Reject" ? "active" : ""
                  }`}
                  onClick={() => setStatusFilter("Reject")}
                >
                  <HiOutlineBan className="icon-filter" />
                  Reject
                </button>
              </div>
              <input
                type="text"
                placeholder="search document"
                style={{
                  width: "400px",
                  paddingLeft: "20px",
                }}
                value={searchResult}
                onChange={(e) => setSearchResult(e.target.value)}
              />
            </div>
            {/* table filter doc  */}

            {allDocs && <Table header={header} data={allDocs} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageDocs;
