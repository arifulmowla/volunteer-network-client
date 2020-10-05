import React from "react";
import logo from "../../images/logos/logo.png";
import { useForm } from "react-hook-form";
import "./volunteerfrom.css";
import { Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { registerVolunteer } from "../../Store/Store";

const VolunteerForm = (props) => {
  const history = useHistory();
  const selectedSupport = props.selectedSupport;

  if (!selectedSupport) {
    history.push("/");
    console.log(selectedSupport);
  }

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    const token = sessionStorage.getItem("Token");
    const allData = { ...data, token, ...selectedSupport };
    registerVolunteer(allData).then((result) => {
      if (result.status === 200) {
        history.push("/dashboard");
      } else {
        history.push("/");
      }
    });
  };

  const userData = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="volunteer-form">
      <Container>
        <Link to="/">
          <img src={logo} alt="logo" className="form-logo my-3" />
        </Link>

        <div className="register-form">
          <h3 className="mb-3">Register as a Volunteer</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="from-group">
              <input
                name="name"
                ref={register({ required: true })}
                className="form-control from-custom"
                placeholder="Full Name"
                value={userData.name}
                readOnly
              />
              {errors.name && <span>This field is required</span>}
            </div>
            <div className="from-group">
              <input
                name="email"
                ref={register({ required: true })}
                className="form-control from-custom"
                placeholder="Username or password"
                value={userData.email}
                readOnly
              />
              {errors.email && <span>This field is required</span>}
            </div>
            <div className="from-group">
              <input
                type="date"
                name="date"
                ref={register({ required: true })}
                className="form-control from-custom"
                placeholder="Date"
              />
              {errors.date && <span>This field is required</span>}
            </div>
            <div className="from-group">
              <textarea
                name="description"
                ref={register({ required: true })}
                className="form-control from-custom"
                placeholder="Description"
              ></textarea>
              {errors.date && <span>This field is required</span>}
            </div>
            <div className="from-group">
              <input
                name="organize"
                ref={register({ required: true })}
                className="form-control from-custom"
                placeholder="Organize books at the library"
              />
              {errors.organize && <span>This field is required</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Register
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default VolunteerForm;
