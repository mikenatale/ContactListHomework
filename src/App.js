import React, { Component } from 'react';
import './App.css';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const _LOCAL_STORAGE_ITEM_NAME = 'ContactListData';

class App extends Component {
    constructor() {
        super();

        this.state = {
            data: []
        };

        this.renderTableRows = this.renderTableRows.bind(this);
        this.updateTableRow = this.updateTableRow.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    componentWillMount() {
        let scope = this;

        let data = localStorage.getItem(_LOCAL_STORAGE_ITEM_NAME);
        if (!data) {
            data = '[{"firstName":"Mike","lastName":"Natale","age":26}]';
            localStorage.setItem(_LOCAL_STORAGE_ITEM_NAME, data);
        }

        scope.setState({
            data: JSON.parse(data)
        });
    }

    updateTableRow(e) {
        const rowNumber = parseInt(e.target.id.split("_")[0], 10);
        const field = e.target.id.split("_")[1];

        let data = this.state.data;
        data[rowNumber][field] = e.target.value;

        this.saveData(data);
    }

    saveData(data) {
        localStorage.setItem(_LOCAL_STORAGE_ITEM_NAME, JSON.stringify(data));
        this.setState({ data });
    }

    renderTableRows() {
        let index = 0;
        return this.state.data.map((contact) => {
            let ret = (
                <TableRow key={`tableRow${index}`}>
                    <TableRowColumn key={`tableRow${index}_0`}>
                        <TextField
                            id={`${index}_lastName`}
                            defaultValue={contact.lastName}
                            onBlur={this.updateTableRow}
                        />
                    </TableRowColumn>
                    <TableRowColumn key={`tableRow${index}_1`}>
                        <TextField
                            id={`${index}_firstName`}
                            defaultValue={contact.firstName}
                            onBlur={this.updateTableRow}
                        />
                    </TableRowColumn>
                    <TableRowColumn key={`tableRow${index}_2`}>
                        <TextField
                            id={`${index}_age`}
                            defaultValue={contact.age}
                            onBlur={this.updateTableRow}
                        />
                    </TableRowColumn>
                </TableRow>
            );
            index += 1;

            return ret;
        });
    }

    render() {
        return (
            <Paper>
                <Table>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Last Name</TableHeaderColumn>
                            <TableHeaderColumn>First Name</TableHeaderColumn>
                            <TableHeaderColumn>Age</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        { this.renderTableRows() }
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default App;
