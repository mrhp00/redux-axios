import React from 'react'
import {connect} from "react-redux";
import {Container, Table} from 'react-bootstrap'

class Reader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Container className={"col-4 justify-content-center"}>
                    <Table className={"table table-striped"}>
                        <tr className={"table-primary"}>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>AGE</th>
                            <th>OPTIONS</th>
                        </tr>
                        {
                            this.props.students.map((value) => (
                                <tr>
                                    <td>{value.id}</td>
                                    <td>{value.name}</td>
                                    <td>{value.age}</td>
                                    <td>
                                        <button className={"btn btn-outline-danger"} value={value.id}
                                                onClick={(e) => {
                                                    this.props.dispatch({
                                                        type: "DEL",
                                                        payload: e.target.value
                                                    })
                                                }}>Delete
                                        </button>
                                        <button className={"btn btn-outline-success"} value={value.id}
                                                onClick={(e) => {
                                                    this.props.students.map((v) => {
                                                        if (v.id === parseInt(e.target.value)) {
                                                            this.props.dispatch({
                                                                type: "Edit",
                                                                payload: {
                                                                    id: v.id,
                                                                    name: v.name,
                                                                    age: v.age
                                                                }
                                                            })
                                                        }
                                                        return 0
                                                    })
                                                }}>Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </Table>
                </Container>
            </>
        )
    }
}

const importState = state => {
    return {
        students: state.students,
        editMode: state.editMode,

    }
}
const exportState = dispatch => {
    return {dispatch}
}
export default connect(importState, exportState)(Reader)