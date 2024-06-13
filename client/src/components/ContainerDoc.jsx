import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { IoEyeOutline, IoCloudDownloadOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import "../styles/ContainerDoc.scss";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const WeeklyView = ({ data }) => {
  const navigate = useNavigate();
  const [document, setDocument] = useState([]);

  const formatDate = (dateTo) => {
    const date = new Date(dateTo);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;

    return formattedDate;
  };
  const handleViewDetail = async (docId) => {
    navigate(`/document/${docId}`);
  };
  useEffect(() => {
    setDocument(data);
  }, [data]);
  return (
    <>
      <div className="container-doc">
        {document.map((doc, index) => {
          return (
            <div key={index} className="item">
              <div onClick={() => handleViewDetail(doc._id)}>
                <img
                  loading="lazy"
                  src={doc.thumbnail}
                  alt=""
                  className="image-doc"
                />
                <h4 style={{}}>{doc.name}</h4>
              </div>
              <div className="dflex-between">
                <div>
                  <MdOutlineDateRange className="secondary-color" />{" "}
                  <span className="mr">{formatDate(doc.createdAt)}</span>
                </div>
                <div>
                  <IoEyeOutline className="secondary-color" />{" "}
                  <span>{doc.views}</span>
                </div>
              </div>
              <div className="dflex-between">
                <div>
                  <FaRegUser className="secondary-color" />{" "}
                  <span className="mr">{doc.nameUser}</span>
                </div>
                <div>
                  <IoCloudDownloadOutline className="secondary-color" />{" "}
                  <span>{doc.downloads}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WeeklyView;
