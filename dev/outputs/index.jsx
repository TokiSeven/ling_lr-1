import React from 'react';
import {Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap';

class GrammarOutput extends React.Component{
    render(){
        return(
            <Col xs = {6} sm = {6}>
                <h3>
                    {this.props.title}
                </h3>
                <ul className = "list-group">
                    {this.props.data.map((v,i) => {
                        return(
                            <li className = "list-group-item">
                                {v}
                            </li>
                        );
                    })}
                </ul>
            </Col>
        );
    }
}

export default class Outputs extends React.Component{
    constructor(props){
        super(props);
        this.convertToAssociativeMassive = this.convertToAssociativeMassive.bind(this);
        this.getRightGrammar = this.getRightGrammar.bind(this);
        this.getLeftGrammar = this.getLeftGrammar.bind(this);
    }

    convertToAssociativeMassive(arr = []){
        let converted = [];
        arr.forEach(function(v) {
            // v[0] is name of terminal
            // v[1] is terminal for 0
            // v[2] is terminal for 1
            // v[3] set to 1 if it is end
            converted[v[0]] = {
                0: (v[1] != '' ? v[1] : null),
                1: (v[2] != '' ? v[2] : null),
                'end': v[3] == '1' ? true : false
            };
        }, this);
        return converted;
    }

    getRightGrammar(){
        let arr = this.convertToAssociativeMassive(this.props.data);
        let errors = [];
        let results = [];
        for(let key in arr){
            let row = arr[key];
            let countOfFreeTerminals = 2; // we can go only by 0 and 1
            let str = [];
            let ends = [];
            for(let i = 0; i < 2; i++){
                if (row[i] != null){
                    if (row[i] in arr){
                        // push current terminal
                        str.push([i, row[i]]);
                        // now count of free places for terminals should increase
                        countOfFreeTerminals--;
                        // it next terminal is end, i should push this end to current terminal
                        if (arr[row[i]]['end'])
                            ends.push(i);
                    }else{
                        errors.push(
                            <span style = {{color: 'red'}}>
                                Нет <b>{row[i]}</b> среди описанных.
                                <br />
                                Ошибка тут: терминал <b>{key}</b> при переходе <b>{i}</b>
                            </span>
                        );
                    }
                }
            }
            // if it is end row and there is empty terminal (only one)
            // we can push it number in array
            if (countOfFreeTerminals == 1 && row['end']){
                if (ends.indexOf(str[0][0]) == -1)
                    ends.push(str[0][0]);
            }

            // convert all ends line to str structure
            ends.forEach(function(v) {
                str.push(['', v]);
            }, this);

            // converts every elemtns ([number, terminal]) in str to string
            let strings = [];
            for(let s of str)
                strings.push(s.join(""));

            // convert all array strings to string
            if (str.length > 0)
                results.push(key + "::=" + strings.join("|"));
        }
        return errors.length ? errors : results;
    }

    getLeftGrammar(){
        let arr = this.convertToAssociativeMassive(this.props.data);
        let errors = [];
        let results = [];
        for(let key in arr){
            let row = arr[key];
            let countOfFreeTerminals = 2;
            let str = [];
            for(let i = 0; i < 2; i++){
                if (row[i] != null){
                    if (row[i] in arr){
                        str.push([i, row[i]]);
                        countOfFreeTerminals--;
                        if (arr[row[i]]['end']){
                            str.push(['', i]);
                        }
                    }else{
                        errors.push(
                            <span style = {{color: 'red'}}>
                                Нет <b>{row[i]}</b> среди описанных.
                                <br />
                                Ошибка тут: терминал <b>{key}</b> при переходе <b>{i}</b>
                            </span>
                        );
                    }
                }
            }
            if (countOfFreeTerminals == 1 && row['end']){
                str.push(['', str[0][0]]);
            }
            let strings = [];
            for(let s of str)
                strings.push(s.join(""));

            if (str.length > 0)
                results.push(key + "::=" + strings.join("|"));
        }
        return errors.length ? errors : results;
    }

    render(){
        let stringsRight = this.getRightGrammar();
        let stringsLeft = this.getLeftGrammar();

        return(
            <Row>
                <GrammarOutput title = "Right - side grammar" data = {stringsRight} />
                <GrammarOutput title = "Left - side grammar" data = {stringsLeft} />
            </Row>
        );
    }
}