import React from "react";
import { render } from "react-dom";
import {createColumns, createTable, valid } from "./Utils";
import { Button, Jumbotron, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

let eq = "a&b"

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: createTable(eq),
            eq: eq,
            cols: createColumns(eq).map((key)=>{
                return {
                    Header: key,
                    accessor: key
                }
            })
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event)
    {
        const { eq } = this.state;
        this.setState({data: createTable(eq)});
        let columns = createColumns(eq).map((key)=>{
                return {
                    Header: key,
                    accessor: key
                }
            });
        this.setState({cols: columns});
        event.preventDefault()
    }
    getValidationState() {
        if (valid(this.state.eq)) return 'success';
        return 'error';
    }

    handleChange(e) {
        this.setState({eq: e.target.value});
    }
    render(){
        let { data } = this.state;
        let { cols } = this.state;

        return <div>
            <Jumbotron className="container" >
                <h1>Welcome to my truth table creator!</h1>
                <p>
                    Simply type in a logical expression and press submit.
                    We only accept the operators: !, |, &, and ^<br />
                    If unsure what to type, click the random equation button (coming soon).<br />
                    ! = not, | = or, & = and, and ^ = xor
                </p>
            </Jumbotron>
                <form onSubmit={this.handleClick} className="container" >
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Enter an valid logical expression below</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.eq}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                            className="container"
                        />

                        <Button type="submit">Submit</Button>
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on correctness of expression.</HelpBlock>
                    </FormGroup>
                </form>
            <ReactTable
                data = { data }
                columns = { cols }
            />
        </div>

    }

}

render(<App/>, document.getElementById("root"));
