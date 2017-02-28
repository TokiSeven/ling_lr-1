import React from 'react';
import {Row, Col} from 'react-bootstrap';

export default class Task3 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            source: "",
            result: ""
        };
        this.changedHandler = this.changedHandler.bind(this);
    }

    changedHandler(e){
        let value = e.target.value;
        let len = value.length;
        let res = "";

        let validations = {
            first: "ijklmnIJKLMN",
            other: "abcdefghopqrstuvwxyzABCDEFGHOPQRSTUVWXYZ_1234567890"
        };

        let curr = 'a';
        // available: a, b, e
        for(let i = 0; i < len && curr != 'e'; i++){
            if (curr == 'a'){
                if (validations['first'].indexOf(value[i]) !== -1)
                    curr = 'b';
                else
                    curr = 'e';
            }else if (curr == 'b'){
                if (validations['other'].indexOf(value[i]) !== -1 || validations['first'].indexOf(value[i]) !== -1)
                    curr = 'b';
                else
                    curr = 'e';
            }
        }
        
        if (curr != 'e')
            res = 'Все корректно';
        else
            res = 'Неправильный символ';

        this.setState({
            source: value,
            result: res
        });
    }

    render(){
        let source = this.state.source.length > 0 ? this.state.source : "Нет входных данных";
        let result = this.state.result.length > 0 ? this.state.result : "Нет выходных данных";
        
        return(
            <Row>
                <Col xs = {12} sm = {12} className = "text-center">
                    <h3>Задание 3</h3>
                    <h4>Представляют собой идентификаторы целого типа в Фортране, начинающиеся с I, J, K, L, M N.</h4>
                </Col>
                <Col xs = {6} sm = {6}>
                    <input onChange = {this.changedHandler} type = "text" className = "form-control" />
                </Col>
                <Col xs = {6} sm = {6}>
                    <ul className = "list-group">
                        <li className = "list-group-item">{source}</li>
                        <li className = "list-group-item">{result}</li>
                    </ul>
                </Col>
            </Row>
        );
    }
}