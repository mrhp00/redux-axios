import React from 'react'
import {connect} from 'react-redux'
import Form from "./Form";
import Reader from "./Reader";
import {Container} from "react-bootstrap";
import axios from "axios";

class App extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        axios.get("http://localhost:3000/a.json")
            .then((res) => {
                this.props.dispatch({
                    type: "DOWNLOAD",
                    payload: res.data.students
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        return (
            <>

                <Form/> <br/>
                <Reader/>

            </>
        )
    }
}

const importState = state => {
    return {
        students: state.students
    }
}
const exportState = dispatch => {
    return {dispatch}
}
export default connect(importState, exportState)(App)