import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { Container } from "react-bootstrap";
import "./dashboard.css";
import { cancelService, getSelectedServices } from "../../Store/Store";

const Dashboard = () => {
  const [selectedData, setSelectedData] = useState([]);
  const token = sessionStorage.getItem("Token");

  useEffect(() => {
    getSelectedServices({ token }).then((data) => setSelectedData(data));
  }, []);
  const cancel = (itemInfo) => {
    cancelService({ ...itemInfo, token }).then((result) => console.log(result));
  };
  return (
    <div className="dashboard">
      <Header dashboard={true}></Header>

      <Container>
        <div className="activity">
          <div className="row act-cards">
            {selectedData.length > 0 &&
              selectedData.map((item) => (
                <div className="col-md-6" key={item._id}>
                  <div className="act-card">
                    <div className="act-img">
                      <img src={item.selectedImg} alt="active help" />
                    </div>
                    <div className="act-content">
                      <div className="act-content-top">
                        <h3>{item.selectedTitle}</h3>
                        <h5>{item.date}</h5>
                      </div>
                      <button
                        className="btn btn-light"
                        onClick={(event) => {
                          cancel({ serviceId: item._id });
                          event.target.parentNode.parentNode.parentNode.style.display =
                            "none";
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            {!selectedData.length > 0 && (
              <p
                className="text-center m-auto p-5 m-5"
                style={{ display: "block" }}
              >
                Please add a service for humanity!
              </p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
