import {createStore} from "redux";
import axios from "axios";

const initialState = {
    students: [],
    editMode: false,
    tempStudent: {id: 0, name: "", age: ""},
    tempID: 0,
    tempName: "",
    tempAge: "",
}


const reducer = (state = initialState, action) => {
    if (action.type === "ADD") {
        if (state.editMode === false) {
            return Object.assign({}, state, {
                students: state.students.concat(action.payload),
            })
        } else {
            let stds = []
            state.students.map((value) => {
                if (value.id !== state.tempID) {
                    stds.push({id: value.id, name: value.name, age: value.age})
                } else {
                    stds.push({id: state.tempID, name: state.tempName, age: state.tempAge})
                }
                return 0
            })
            return Object.assign({}, state, {
                students: [...stds],
                editMode: false
            })
        }
    } else if (action.type === "DEL") {
        let refID = parseInt(action.payload)
        let stds = []
        state.students.map((value) => {
            if (value.id !== refID) {
                stds.push({id: stds.length + 1, name: value.name, age: value.age})
            }
            return 0
        })
        return Object.assign({}, state, {
            students: [...stds]
        })
    } else if (action.type === "Edit") {
        return Object.assign({}, state, {
            editMode: true,
            tempStudent: {
                id: action.payload.id,
                name: action.payload.name,
                age: action.payload.age,
            }
        })
    } else if (action.type === "Update") {
        let stds = []
        state.students.map((value) => {
            if (value.id !== action.payload.id) {
                stds.push({id: stds.length + 1, name: value.name, age: value.age})
            } else {
                stds.push(action.payload)
            }

            return 0
        })
        return Object.assign({}, state, {
            students: [...stds],
            editMode: false,
        })
    } else if (action.type === "DOWNLOAD") {
        return Object.assign({}, state, {
            students: action.payload,
        })

    }
    return state
}
const store = createStore(reducer)
export default store