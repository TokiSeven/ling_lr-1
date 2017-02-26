import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import TableInputs from './inputs/index.jsx';
import Outputs from './outputs/index.jsx';

class Page extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        };
        this.dataChangedHandler = this.dataChangedHandler.bind(this);
    }

    dataChangedHandler(newData){
        this.setState({
            data: newData
        });
    }

    render(){
        return(
            <Grid>
                <Row>
                    <Col xs = {12} sm = {12} className = "text-center">
                        <h1>Рябцев Владимир Дмитриевич</h1>
                        <h2>Лабораторная работа 1</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs = {6} sm = {6}>
                        <TableInputs dataChangedHandler = {this.dataChangedHandler} />
                    </Col>
                    <Col xs = {6} sm = {6}>
                        <Outputs data = {this.state.data} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

ReactDOM.render(<Page />, document.getElementById('app'));