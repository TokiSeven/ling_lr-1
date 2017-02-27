import React from 'react';
import {Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap';
import Grammar from './Grammar.jsx';

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
        this.Grammar = new Grammar();
    }

    render(){
        let stringsRight = this.Grammar.getRight(this.props.data);
        let stringsLeft = this.Grammar.getLeft(this.props.data);

        return(
            <Row>
                <GrammarOutput title = "Right - side grammar" data = {stringsRight} />
                <GrammarOutput title = "Left - side grammar" data = {stringsLeft} />
            </Row>
        );
    }
}