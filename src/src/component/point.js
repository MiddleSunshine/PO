import React from 'react'
import {Card,Row,Col} from "antd";
import {SaveOutlined,RightOutlined,DeleteOutlined,SketchOutlined } from '@ant-design/icons';
import config from "../config/setting";
class Point extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            pid:props.pid,
            id:props.id,
            hidden:false,
            status:'init',
            point:0
        }
        this.deleteThis=this.deleteThis.bind(this);
        this.hiddenThis=this.hiddenThis.bind(this);
    }
    deleteThis(){
        if (this.props.id){

        }else{
            this.hiddenThis();
        }
    }
    hiddenThis(){
        this.setState({
            hidden:true
        });
    }
    render(){
        if (this.state.hidden){
            return null;
        }
        return(
            <Card
                className={"subPoint"} style={{backgroundColor:config.statusBackGroupColor[this.state.status]}}
            >
                <Row justify="space-around" align="middle">
                    <Col span={2} className={"icons"}>
                        {this.state.point}
                    </Col>
                    <Col span={16}>
                        <input
                            style={{width:"90%",margin:"5px"}}
                        />
                    </Col>
                    <Col span={2} className={"icons"}>
                        <SaveOutlined/>
                    </Col>
                    <Col span={2} className={"icons"}>
                        <DeleteOutlined
                            onClick={()=>this.deleteThis()}
                        />
                    </Col>
                    <Col span={2} className={"icons"}>
                        {this.state.id}
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default Point