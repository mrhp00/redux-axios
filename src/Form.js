import React, {createRef} from 'react'
import {Container, Button} from 'react-bootstrap'
import {connect, useSelector} from "react-redux";

// const edit=state=>state.editMode


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            age: ""
        }
        this.txtName = createRef()
        this.txtAge = createRef()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.editMode === true) {
            this.txtName.current.value = this.props.tempStudent.name
            this.txtAge.current.value = this.props.tempStudent.age
        }
    }

    render() {
        return (
            <>

                <Container className={"col-4 justify-content-center"}>
                    <input type={"text"} placeholder={"NAME"} ref={this.txtName}
                    /><br/>

                    <input type={"text"} placeholder={"AGE"} ref={this.txtAge}
                    /><br/>

                    <Button className={"btn-primary"} onClick={(e) => {
                        // const editor=useSelector(edit)
                        console.log(this.props.editMode)
                        if (this.props.editMode === false) {
                            this.props.dispatch({
                                type: "ADD",
                                payload: {
                                    id: this.props.students.length + 1,
                                    name: this.txtName.current.value,
                                    age: this.txtAge.current.value
                                }
                            })
                            this.txtName.current.value = ""
                            this.txtAge.current.value = ""
                        } else if (this.props.editMode === true) {

                            this.props.dispatch({
                                type: "Update",
                                payload: {
                                    id: this.props.tempStudent.id,
                                    name: this.txtName.current.value,
                                    age: this.txtAge.current.value
                                }
                            })
                        }
                    }}
                    >SAVE</Button>
                    <Button className={"btn-primary"}>Cancel</Button>

                </Container>
            </>
        )
    }
}

const importState = state => {
    return {
        students: state.students,
        editMode: state.editMode,
        tempStudent: state.tempStudent,
        tempID: state.tempID,
        tempAge: state.tempAge,
        tempName: state.tempName
    }
}
const exportState = dispatch => {
    return {dispatch}
}
export default connect(importState, exportState)(Form)