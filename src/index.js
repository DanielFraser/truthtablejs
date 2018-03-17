import React from "react";
import { render } from "react-dom";
import { makeData, createColumns, createTable } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const equation = "a&b&c&d&e&f";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: createTable(equation)
        };
    }
    render(){
        const { data } = this.state;
        console.log(createColumns(equation));
        const columns = createColumns(equation).map((key)=>{
            return {
                Header: key,
                accessor: key
            }
        });

        return <ReactTable
            data = { data }
            columns = { columns }
        />
    }
}

render(<App/>, document.getElementById("root"));
