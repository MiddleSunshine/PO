import React from 'react'
import {Card,Row,Col} from "antd";
import {SaveOutlined,RightOutlined,DeleteOutlined } from '@ant-design/icons';
import config from "../config/setting";
class Point extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            pid:props.pid,
            id:props.id,
            hidden:false,
            status:'init'
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
            <Card className={"subPoint"} style={{backgroundColor:config.statusBackGroupColor[this.state.status]}}>
                <Row justify="space-around" align="middle">
                    <Col span={18}>
                        <input
                            style={{width:"90%",margin:"5px"}}
                        />
                    </Col>
                    <Col span={2} className={"icons"}>
                        <SaveOutlined
                        />
                    </Col>
                    <Col span={2} className={"icons"}>
                        <RightOutlined />
                    </Col>
                    <Col span={2} className={"icons"}>
                        <DeleteOutlined
                            onClick={()=>this.deleteThis()}
                        />
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default Point