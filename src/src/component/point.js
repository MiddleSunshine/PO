import React from 'react'
import {Card} from "antd";

class Point extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            pid:props.pid
        }
    }
    render(){
        return(
            <Card.Grid>

            </Card.Grid>
        )
    }
}

export default Point