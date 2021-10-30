import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteEmp, updateEmp} from './app/Employee'


function Employee({ emp, setFetch }) {
    const dispatch = useDispatch()
  const [editName, setEditName] = useState(emp.EmployeeName);
  const [editAge, setEditAge] = useState(emp.EmployeeAge);
  const [editEmail, setEditEmail] = useState(emp.EmployeeEmail);
  const [edit, setEdit] = useState(false);

  const handleEdit = (e, id) => {
      e.preventDefault()
    const editedEmp = {
      EmployeeId: id,
      EmployeeName: editName ,
      Age: editAge ,
      Email: editEmail ,
    };
    dispatch(updateEmp(editedEmp));
    setEdit(false)
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    setFetch(!fetch)
    dispatch(deleteEmp(id));
  };

  return (
    <div className="emp-cont">
      <div onMouseOver={() => setFetch(!fetch)} className="single-emp">
        {edit ? (
          <div className="emp-stat">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <input
              type="number"
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
            />
            <input
              type="text"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="emp-stat">
            <p>{emp.EmployeeName}</p>
            <p>{emp.EmployeeAge}</p>
            <p>{emp.EmployeeEmail}</p>
          </div>
        )}
        <div className="empbtn">
          <button onClick={(e) => handleDelete(e, emp.EmployeeId)}>Delete</button>
          <button onClick={() => setEdit(!edit)}>Edit</button>
          {edit && (
            <button onClick={(e) => handleEdit(e, emp.EmployeeId)}>
              Complete Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default Employee;
