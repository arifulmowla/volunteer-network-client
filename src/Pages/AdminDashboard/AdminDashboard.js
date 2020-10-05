import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DataTable from "react-data-table-component";
import { deleteRegisterEntry, getAllVolunteer } from "../../Store/Store";
import { Button } from "react-bootstrap";
import trash from "../../images/logos/trash.png";

const AdminDashboard = () => {
  const [vounteers, setVolunteers] = useState([]);
  useEffect(() => {
    getAllVolunteer().then((data) => setVolunteers(data));
  }, []);
  console.log(vounteers);
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const columns = [
    {
      name: "name",
      selector: "name",
      sortable: true,
    },
    {
      name: "email",
      selector: "email",
      right: true,
    },
    {
      name: "Registration date",
      selector: "date",
      right: true,
    },
    {
      name: "Volunteer list",
      selector: "organize",
      center: true,
    },
    {
      cell: (row) => (
        <Button
          raised
          danger
          variant="danger"
          onClick={(event) => {
            const document = event.target.parentNode.parentNode.parentNode;
            deleteEntry({ id: row._id }, document);
          }}
        >
          <img src={trash} alt="trash" style={{ width: "18px" }} />
        </Button>
      ),
      name: "Action",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const deleteEntry = (id, document) => {
    deleteRegisterEntry(id).then((res) => {
      if (res.status === 200) {
        document.style.display = "none";
      }
    });
  };
  return (
    <div className="admin-dashboard">
      <div className="row">
        <div className="col-md-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-md-9 p-5">
          <h3>Volunteer register list</h3>
          <div className="dashboard-content">
            <div className="dashboard-table">
              <DataTable
                columns={columns}
                customStyles={customStyles}
                data={vounteers}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
