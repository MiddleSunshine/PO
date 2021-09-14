import React from 'react'
import Point from "../component/point";
import {Card,Select,Row,Col,Button} from "antd";
import "./../css/Collector.css"
import {SaveOutlined,PlusCircleOutlined,DeleteOutlined,UnorderedListOutlined} from '@ant-design/icons';
import config from "../config/setting";

const { Option } = Select;

class Collector extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:0,
            initPoints:{
                id:0,
                pid:0,
                keyword:'',
                status:'init',
                children:[]
            },
            initSubPoints:{
                id:0,
                pid:0
            },
            points:[
                {
                    id:0,
                    keyword:'输入内容',
                    status:'solved',
                    children:[
                        {
                            id:0
                        }
                    ]
                }
            ],
            statusBackGroupColor:config.statusBackGroupColor,
            statusMap:config.statusMap
        }
        this.newSubPoint=this.newSubPoint.bind(this);
        this.newPoint=this.newPoint.bind(this);
    }
    newSubPoint(pid,index){
        let newPoint=this.state.initSubPoints;
        newPoint.pid=pid;
        let points=this.state.points;
        points[index].children.push(newPoint);
        this.setState({
            points:points
        });
    }
    newPoint(){
        let newPoint=this.state.initPoints;
        newPoint.pid=this.state.id;
        let points=this.state.points;
        points.push(newPoint);
        this.setState({
            points:points
        })
    }
    render() {
        return(
            <div className="container">
                <Row
                    justify="start" align="middle"
                >
                    <Col span={6}>
                        <Button
                            icon={<PlusCircleOutlined/>}
                            type={"primary"}
                            onClick={()=>this.newPoint()}
                        >
                            New Point
                        </Button>
                    </Col>
                    <Col span={2}>Status Filter</Col>
                    <Col span={7}>
                        <Select
                            style={{width:"100%"}}
                            mode="multiple"
                            defaultValue={['new', 'solved']}
                        >
                            {this.state.statusMap.map((Item)=>{
                                return(
                                    <Option value={Item.value} key={Item.value}>{Item.label}</Option>
                                )
                            })}
                        </Select>
                    </Col>
                </Row>
                <hr/>
                {this.state.points.map((Item,outsideIndex)=>{
                    let backgroundColor=this.state.statusBackGroupColor[Item.status];
                    return(
                        <Card
                            style={{backgroundColor:backgroundColor}}
                            key={outsideIndex}
                            className={"Collector"}
                            title={
                                <Row justify={"center"} align={"middle"} wrap={false} style={{padding:"5px"}}>
                                    <textarea
                                        value={Item.keyword}
                                    />
                                </Row>
                            }
                        >
                            <Card
                                className={"actions"}
                                style={{backgroundColor:backgroundColor}}
                                onClick={()=>this.newSubPoint(Item.id,outsideIndex)}
                            >
                                <Card.Grid className={"icons"}>
                                    <PlusCircleOutlined/>
                                </Card.Grid>
                                <Card.Grid className={"icons"}>
                                    <SaveOutlined />
                                </Card.Grid>
                                <Card.Grid>
                                    <Select value={Item.status} className={Item.status}>
                                        {this.state.statusMap.map((Item)=>{
                                            return(
                                                <Option value={Item.value} key={Item.value}>{Item.label}</Option>
                                            )
                                        })}
                                    </Select>
                                </Card.Grid>
                                <Card.Grid className={"icons"}>
                                    <DeleteOutlined/>
                                </Card.Grid>
                                <Card.Grid className={"icons"}>
                                    <UnorderedListOutlined />
                                </Card.Grid>
                            </Card>
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