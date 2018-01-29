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

class App extends Component {
    constructor() {
        super();

        this.state = {
            data: []
        };

        this.renderTableRows = this.renderTableRows.bind(this);
    }

    componentWillMount() {
        let scope = this;

        let data = localStorage.getItem('ContactListData');
        if (!data) {
            data = '[{"firstName":"Mike","lastName":"Natale","age":26}]';
            localStorage.setItem('ContactListData', data);
        }

        scope.setState({
            data: JSON.parse(data)
        });
    }

    renderTableRows() {
        let index = 0;
        return this.state.data.map((contact) => {
            let ret = (
                <TableRow>
                    <TableRowColumn>
                        <TextField
                            id={`${index}_lastName`}
                            defaultValue={contact.lastName}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <TextField
                            id={`${index}_firstName`}
                            defaultValue={contact.firstName}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <TextField
                            id={`${index}_age`}
                            defaultValue={contact.age}
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
