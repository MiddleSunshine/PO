import React from 'react'
import Point from "../component/point";
import {Card,Select,Row,Col} from "antd";
import "./../css/Collector.css"
import {SaveOutlined,PlusCircleOutlined} from '@ant-design/icons';

const { Option } = Select;

class StatusChange extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            pid:props.id,
            status:props.status,
            statusMap:[
                'new',
                'solved',
                'give up'
            ]
        }
    }
    render() {
        return(
            <Select>
                {
                    this.state.statusMap.map((Item)=>{
                        return(
                            <Option key={Item} value={Item}>{Item}</Option>
                        )
                    })
                }
            </Select>
        )
    }
}

class Collector extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:0,
            points:[
                {
                    id:0,
                    keyword:'',
                    status:'new',
                    children:[
                        {
                            id:1
                        }
                    ]
                }
            ]
        }
    }
    render() {
        return(
            <div className="container">
                <hr/>
                {this.state.points.map((Item,outsideIndex)=>{
                    return(
                        <Card
                            key={outsideIndex}
                            className={"Collector"}
                            title={
                                <Row justify={"center"} align={"middle"} wrap={false} style={{padding:"5px"}}>
                                    <Col span={20}>
                                        <textarea
                                            style={{width:"90%"}}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <Row justify={"start"} align={"middle"}>
                                            <Select>
                                                <Option value={"new"}>New</Option>
                                                <Option value={"solved"}>Solved</Option>
                                                <Option value={"give_up"}>Give Up</Option>
                                            </Select>
                                        </Row>
                                        <Row style={{paddingTop:"4px",paddingBottom:"4px"}} justify={"start"} align={"middle"}>
                                            <SaveOutlined/>
                                        </Row>
                                        <Row justify={"start"} align={"middle"}>
                                            <PlusCircleOutlined/>
                                        </Row>
                                    </Col>
                                </Row>
                            }
                        >
                            {Item.children.map((childItem,index)=>{
                                return(
                                    <Point
                                        key={index}
                                        pid={Item.id}
                                        id={childItem.id}
                                    />
                                )
                            })}
                        </Card>
                    )
                })}
            </div>
        )
    }
}

export default Collector