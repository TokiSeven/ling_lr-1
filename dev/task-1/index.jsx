import React from 'react';
import {Row, Col} from 'react-bootstrap';

import Inputs from './inputs/';
import Outputs from './outputs/';

export default class Task1 extends React.Component{
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
            <Row>
                <Col xs = {12} sm = {12} className = "text-center">
                    <h3>Задание 1</h3>
                </Col>
                <Col xs = {6} sm = {6}>
                    <Inputs dataChangedHandler = {this.dataChangedHandler} />
                </Col>
                <Col xs = {6} sm = {6}>
                    <Outputs data = {this.state.data} />
                </Col>
            </Row>
        );
    }
}