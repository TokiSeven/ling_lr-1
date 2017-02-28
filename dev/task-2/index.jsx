import React from 'react';
import {Row, Col} from 'react-bootstrap';

export default class Task2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            source: "",
            converted: "",
            result: ""
        };
        this.changedHandler = this.changedHandler.bind(this);
    }

    changedHandler(e){
        let sourceValue = e.target.value;
        let convertedValue = sourceValue.match(/1|0/gi);

        if (sourceValue === convertedValue.join("") && sourceValue != ''){
            let statements = {
                b: [true, false], // 0 нечетный, 1 нечетная
                c: [true, true], // 0 нечетный, 1 четная
                d: [false, false], // 0 четный, 1 нечетная
                e: [false, true] // 0 четный, 1 четная
            };
            let curr = 'e';
            convertedValue.forEach(function(v) {
                if(curr == 'b') curr = (v == '1') ? 'c' : 'd';
                else if(curr == 'c') curr = (v == '1') ? 'b' : 'e';
                else if(curr == 'd') curr = (v == '1') ? 'e' : 'b';
                else if(curr == 'e') curr = (v == '1') ? 'd' : 'c';
            }, this);

            let results = [];
            results.push(statements[curr][0] ? "Нули - прошли" : "Нули - не прошли");
            results.push(statements[curr][1] ? "Еденицы - прошли" : "Еденицы - не прошли");
            results.push(statements[curr][0] && statements[curr][1] ? "Итог - распознано" : "Итог - не распознано")
            results.push(curr);

            this.setState({
                source: sourceValue,
                converted: convertedValue.join(", "),
                result: results.join(". ")
            });
        }else{
            this.setState({
                source: "",
                converted: "",
                result: ""
            });
        }
    }

    render(){
        let source = this.state.source.length > 0 ? this.state.source : "Нет входных данных";
        let converted = this.state.converted.length > 0 ? this.state.converted : "Нет отфильтрованных данных";
        let result = this.state.result.length > 0 ? this.state.result : "Нет выходных данных";
        
        return(
            <Row>
                <Col xs = {12} sm = {12} className = "text-center">
                    <h3>Задание 2</h3>
                    <h4>Число "1" – четное и число "0" – нечетное.</h4>
                </Col>
                <Col xs = {6} sm = {6}>
                    <input onChange = {this.changedHandler} type = "text" className = "form-control" />
                </Col>
                <Col xs = {6} sm = {6}>
                    <ul className = "list-group">
                        <li className = "list-group-item">{source}</li>
                        <li className = "list-group-item">{converted}</li>
                        <li className = "list-group-item">{result}</li>
                    </ul>
                </Col>
            </Row>
        );
    }
}