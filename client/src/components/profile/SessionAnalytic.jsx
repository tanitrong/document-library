import { IoDocumentTextOutline } from "react-icons/io5";
import { BsCloudDownloadFill } from "react-icons/bs";
import { RiUserFollowFill } from "react-icons/ri";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
const SessionAnalytic = () => {
  const authUser = useSelector((state) => state.user.user);
  const [documentTotal, setDocumentTotal] = useState(0);
  const [downloadTotal, setDownloadTotal] = useState(0);
  useEffect(() => {
    (async () => {
      await axios.get(`${server}/doc/stats/${authUser?._id}`).then((res) => {
        setDocumentTotal(res.data.data.totalDocuments);
        setDownloadTotal(res.data.data.totalDownloads);
      });
    })();
  }, [authUser]);
  return (
    <SessionAnalyticContainer>
      <div className="item">
        <IoDocumentTextOutline
          className="analytics-icon"
          style={{ backgroundColor: "#FFF2E9", color: "#FF6A00" }}
        />
        <div>
          <p style={{ margin: 0 }} className="secondary-color">
            Tài liệu
          </p>
          <h4 style={{ margin: 0 }}>{documentTotal}</h4>
        </div>
      </div>

      <div className="item">
        <BsCloudDownloadFill
          className="analytics-icon"
          style={{ backgroundColor: "#EDE8FF", color: "#551FFF" }}
        />
        <div>
          <p style={{ margin: 0 }} className="secondary-color">
            download
          </p>
          <h4 style={{ margin: 0 }}>{downloadTotal}</h4>
        </div>
      </div>
      <div className="item">
        <RiUserFollowFill
          className="analytics-icon"
          style={{ backgroundColor: "#EAF9FF", color: "#00B7FE" }}
        />
        <div>
          <p style={{ margin: 0 }} className="secondary-color">
            Luot follow
          </p>
          <h4 style={{ margin: 0 }}>3</h4>
        </div>
      </div>
    </SessionAnalyticContainer>
  );
};

export default SessionAnalytic;
const SessionAnalyticContainer = styled.section`
  margin: 40px;
  width: 653px;
  display: flex;
  justify-content: space-between;
  padding: 30px 40px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 5px;
  .item {
    display: flex;
    .analytics-icon {
      font-size: 20px;
      padding: 10px;
      border-radius: 7px;
      margin-right: 10px;
    }
  }
`;
