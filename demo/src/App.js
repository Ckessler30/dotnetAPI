import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addEmp, deleteEmp, fetchAllEmps } from './app/Employee'
import Employee from './Employee'

import './App.css'

function App() {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [fetch, setFetch] = useState(false)

    


    const allEmps = useSelector(state => state.employees)
    useEffect(() => {
        dispatch(fetchAllEmps())
        console.log("refresh")
    }, [dispatch, fetch])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(name && age && email){
            dispatch(addEmp({EmployeeName: name, Age: age, Email: email}))
            setFetch(!fetch)
            setName('')
            setEmail('')
            setAge('')
        }else{
            setErrors(["Please fill out all fields and resubmit"])
        }

    }

    
    
    return (
      <div className="mainStuff">
        <div
          className="header"
          style={{
            backgroundImage: `url("https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f3492163525b22f2adbdc5c%2FPersian-Gulf-Tensions%2F960x0.jpg%3Ffit%3Dscale")`,
          }}
        >
          <h1>Moonrake</h1>
          <p>AUTOMATING AND INTEGRATING WELL-DEFINED SOLUTIONS.</p>
        </div>
        <div className="bottomSutff">

            <h1>Employees</h1>
            <div className="emps">

                {allEmps &&
                allEmps.map((emp) => <Employee setFetch={setFetch} emp={emp} />)}
            </div>

            <div className="err">{errors && errors.map((err) => <p>{err}</p>)}</div>
            <div className="newEmp">
            <h1>New Employee</h1>
            <div className="newEmpInputs">
                <div className="newEmpInside">

                    <label htmlFor="name">Name</label>
                    <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    name="name"
                    />
                    <label htmlFor="email">Email</label>
                    <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    name="email"
                    />
                    <label htmlFor="age">Age</label>
                    <input
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                    type="number"
                    name="age"
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>
                Submit New Employee
                </button>
            </div>
            </div>
        </div>
      </div>
    );
}

export default App
