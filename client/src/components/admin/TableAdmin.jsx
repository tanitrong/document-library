import { FaRegEdit } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import { MdDeleteOutline } from "react-icons/md";
import styled from "styled-components";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
const TableAdmin = ({ header, data }) => {
  const navigate = useNavigate();
  const editDoc = () => {};
  const viewDoc = (id) => {
    navigate(`/admin/manage-docs/review/${id}`);
  };
  return (
    <Container>
      <div className="table-admin">
        <div className="table-header__admin">
          {header.map((h, i) => {
            return (
              <div className={`admin-header__item${i + 1}`} key={i}>
                <p id="name" className="admin-filter__link" href="">
                  {h}
                </p>
              </div>
            );
          })}
          <div className="admin-header__item6">
            <p
              id="total"
              className="admin-filter__link admin-filter__link--number"
              href=""
            >
              Action
            </p>
          </div>
        </div>
        <div className="admin__table-content">
          {data.length > 0 ? (
            data.map((d, i) => {
              return (
                <div className="admin__table-row" key={i}>
                  <div className="admin__table-data1">{d.name}</div>
                  <div className="admin__table-data2">
                    {d.nameUser || "082452168"}
                  </div>
                  <div className="admin__table-data3">
                    {d.price || d.price == 0 ? d.price : "saving"}
                  </div>
                  <div className="admin__table-data4">
                    {formatDate(d.createdAt)}
                  </div>
                  <div className="admin__table-data5">
                    {d.status ? d.status : "active"}
                  </div>
                  <div className="admin__table-data6">
                    <FaRegEdit
                      style={{
                        fontSize: "20px",
                        verticalAlign: "middle",
                        marginRight: "20px",
                      }}
                      onClick={editDoc}
                    />
                    <MdDeleteOutline
                      style={{
                        fontSize: "20px",
                        verticalAlign: "middle",
                        marginRight: "20px",
                      }}
                    />
                    <VscPreview
                      style={{
                        fontSize: "20px",
                        verticalAlign: "middle",
                      }}
                      onClick={() => viewDoc(d._id)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: "center" }}>Loading....</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default TableAdmin;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .table-admin {
    width: 100%;
    margin-top: 40px;
  }

  .table-header__admin {
    display: flex;
    width: 100%;
    background: #59efb2;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .admin__table-row {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding: 10px 0;
    background-color: white;
    border-bottom: 1px solid #b8b8b8;
  }
  .admin-header__item1 {
    text-align: center;
  }
  .admin__table-data1 {
    padding-left: 40px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #5d596c;
    font-weight: 600;
    font-size: medium;
  }

  .admin__table-data2 {
    color: #888888;
    font-weight: 400;
  }
  .admin__table-data3 {
    color: #12ab7f;
    font-weight: 600;
  }
  .admin__table-data4 {
    font-weight: 600;
    color: #5d596c;
  }
  .admin__table-data5 {
    font-weight: 600;
    color: #ff8c3a;
  }
  .admin__table-data6 {
    color: #6f6b7d;
  }
  .admin__table-data1,
  .admin-header__item1 {
    flex: 1 1 28%;
    margin-left: 5px;
  }
  .admin__table-data2,
  .admin-header__item2 {
    text-align: center;
    flex: 1 1 16%;
  }
  .admin__table-data3,
  .admin-header__item3 {
    text-align: center;
    flex: 1 1 13%;
  }
  .admin__table-data4,
  .admin-header__item4 {
    text-align: center;
    flex: 1 1 12%;
  }
  .admin__table-data5,
  .admin-header__item5 {
    text-align: center;
    flex: 1 1 12%;
  }
  .admin__table-data6,
  .admin-header__item6 {
    text-align: center;
    flex: 1 1 19%;
  }
  .admin-header__item {
    text-transform: uppercase;
  }

  .admin-filter__link {
    color: white;
    text-decoration: none;
    position: relative;
    display: inline-block;
  }
`;
