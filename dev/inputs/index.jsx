import React from 'react';
import {Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap';

export default class TableInputs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [
                ['', '', '','']
            ]
        };
        this.addRow = this.addRow.bind(this);
        this.changedValue = this.changedValue.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.props.dataChangedHandler(this.state.data);
    }

    addRow(){
        let _data = this.state.data;
        _data.push(['', '', '', '']);
        this.setState({
            data: _data
        });
    }

    removeRow(){
        if (this.state.data.length > 1){
            let _data = this.state.data;
            _data.pop();
            this.setState({
                data: _data
            });
            this.props.dataChangedHandler(this.state.data);
        }
    }

    changedValue(i, j, val){
        let _data = this.state.data;
        _data[i][j] = val;
        this.setState({
            data: _data
        });
        this.props.dataChangedHandler(this.state.data);
    }

    render(){
        let rows = [];
        for(let i = 0; i < this.state.data.length; i++){
            let current_row = [];
            for (let j = 0; j < 4; j++){
                let styles = {};
                if (((j == 0 || j == 3)))
                    styles = {
                        backgroundColor: 'black',
                        color: 'white'
                    };
                current_row.push(
                    <td key = {j}>
                        <input className = "form-control" style = {styles} onChange = {(e) => {this.changedValue(i, j, e.target.value)}} type = "text" />
                    </td>
                );
            }
            rows.push(
                <tr key = {i}>
                    {current_row}
                </tr>
            );
        }
        return(
            <Row>
                <Col xs = {12} sm = {12}>
                    <center>
                        <h3>
                            Inputs
                        </h3>
                    </center>
                </Col>
                <Col xs = {12} sm = {12}>
                    <Row>
                        <Col className = "text-left" xs = {6} sm = {6}>
                            <button className = "btn btn-primary" onClick = {this.addRow}>Добавить строку</button>
                        </Col>
                        <Col className = "text-right" xs = {6} sm = {6}>
                            <button className = "btn btn-danger" onClick = {this.removeRow}>Удалить строку</button>
                        </Col>
                    </Row>
                </Col>
                <Col xs = {12} sm = {12}>
                    <Row>
                        <table className = "table table-hover table-condensed">
                            <thead>
                                <th></th>
                                <th><center>0</center></th>
                                <th><center>1</center></th>
                                <th></th>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </Row>
                </Col>
            </Row>
        );
    }
}