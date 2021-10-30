/* ----------------------------------------------------------------------- */
/* -----------------------------Actions----------------------------------- */
/* ----------------------------------------------------------------------- */

const GET_EMPS = "employee/GET_EMPS";
const ADD_EMP = "employee/ADD_EMP";
const DELETE_EMP = "employee/DELETE_EMP";
const EDIT_EMP = "emplyee/EDIT_EMP"

/* ----------------------------------------------------------------------- */
/* ----------------------------Action Creators---------------------------- */
/* ----------------------------------------------------------------------- */

const getEmpsAction = (allEmps) => ({
  type: GET_EMPS,
  allEmps
});

const addEmpsAction = (emp) => ({
  type: ADD_EMP,
  emp,
});

const deleteEmpAction = (id) => ({
  type: DELETE_EMP,
  id,
});

const editEmpsAction = (emp) => ({
    type: EDIT_EMP,
    emp
})

/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const fetchAllEmps = () => async (dispatch) => {
  const allEmps = await fetch("/api/employee");
  const emps = await allEmps.json()
  dispatch(getEmpsAction(emps))
//   const spots = await allSpots.json();
//   //   console.log(spots.allSpots)
//   dispatch(getSpotsAction(spots.allSpots));
};

export const addEmp = (emp) => async (dispatch) => {
  // console.log("HERERER", spot)
  const res = await fetch("/api/employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emp),
  });
  // const newSpot = await res.json()
  // console.log(newSpot)
  // console.log(res)
  console.log(res)
  const result = await res.json()
  console.log(result)
  if(res.ok){
      const {EmployeeName, Age, Email} = emp
      const returnEmp = {
          EmployeeName,
          EmployeeAge: Age,
          EmployeeEmail: Email
      }
      dispatch(addEmpsAction(returnEmp))
  }
};

export const deleteEmp = (id) => async (dispatch) => {
  const res = await fetch(`/api/employee/${id}`, {
    method: "DELETE",
  });
  console.log(res)
  if (res.ok) {
    dispatch(deleteEmpAction(id));
  }
};

export const updateEmp = (updatedEmp) => async (dispatch) => {
  // console.log("LOOK", updatedSpot)
  const res = await fetch(`/api/employee`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEmp),
  });

  if (res.ok) {
    const {EmployeeId, EmployeeName, Age, Email} = updatedEmp
      const returnEmp = {
          EmployeeId,
          EmployeeName,
          EmployeeAge: Age,
          EmployeeEmail: Email
      }
      dispatch(editEmpsAction(returnEmp))
  }
};
/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = [];

const allEmpsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_EMPS:
      newState = [...action.allEmps];
      return newState;
    case ADD_EMP:
      newState = [...state, action.emp];
      // console.log("HERE IS THE STATE",newState)
      return newState;
    case DELETE_EMP:
      newState = [...state];
      for (let i = 0; i < newState.length; i++) {
        const emp = newState[i];
        if (emp.EmployeeId === action.id) {
          newState.splice(newState.indexOf(emp), 1);
        }
      }
      return newState;
    case EDIT_EMP:
        newState = [...state]
        for(let i = 0; i < newState.length; i++){
            const emp = newState[i]
            if(emp.EmployeeId === action.emp.EmployeeId){
                newState.splice(newState.indexOf(emp), 1, action.emp)
            }
        }
        return newState
    default:
      return state;
  }
};

export default allEmpsReducer;
