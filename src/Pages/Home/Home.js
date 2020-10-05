import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { getAllServices } from "../../Store/Store";
import "./home.css";

const Home = (props) => {
  const [services, setServices] = useState([]);
  const setSelectedSupport = props.setSelectedSupport;
  const history = useHistory();

  const handleSupport = (supportInfo) => {
    setSelectedSupport(supportInfo);
    history.push("/volunteer-form");
  };

  const homeData = getAllServices();

  useEffect(() => {
    homeData.then((data) => setServices(data));
  }, []);
  const colors = ["#FFBD3E", "#FF7044", "#3F90FC", "#421FCF"];
  const color = () => {
    const selectedColor = colors[Math.floor(Math.random() * 4)];
    const colorStyle = { backgroundColor: selectedColor.toString() };
    return colorStyle;
  };
  console.log(color());
  return (
    <div className="home">
      <Header></Header>

      <div className="hero">
        <Container>
          <div className="hero-heading">
            <h1 className="text-center">I GROW BY HELPING PEOPLE IN NEED.</h1>
            <div className="search-box mt-4">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search..."
                className="btn"
              />
              <button className="btn btn-primary">Search</button>
            </div>
          </div>

          <div className="supports">
            <div className="row support-row">
              {services.map((item) => (
                <div
                  className="col-md-3"
                  key={item._id}
                  onClick={() => {
                    handleSupport({
                      selectedId: item._id,
                      selectedImg: item.image,
                      selectedTitle: item.title,
                    });
                  }}
                >
                  <div className="support-card">
                    <img src={item.image} alt="child Support" />
                    <div className="card-footer" style={color()}>
                      <h5>{item.title}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
