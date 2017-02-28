import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col} from 'react-bootstrap';

import Task1 from './task-1/';
import Task2 from './task-2/';
import Task3 from './task-3/';

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
                <hr />
                <Task1 />
                <hr />
                <Task2 />
                <hr />
                <Task3 />
                <div style = {{marginBottom: "200px"}}>
                </div>
            </Grid>
        );
    }
}

ReactDOM.render(<Page />, document.getElementById('app'));