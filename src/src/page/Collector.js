import React from 'react'
import Point from "../component/point";
import {Card,Select,Row,Col,Button} from "antd";
import "./../css/Collector.css"
import {SaveOutlined,PlusCircleOutlined,DeleteOutlined,UnorderedListOutlined,FileMarkdownOutlined} from '@ant-design/icons';
import config from "../config/setting";

const { Option } = Select;

class Collector extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:0,
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
        this.savePoint=this.savePoint.bind(this);
        this.deletePoint=this.deletePoint.bind(this);
        this.openNewPage=this.openNewPage.bind(this);
        this.showMoreFile=this.showMoreFile.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSelectorChange=this.handleSelectorChange.bind(this);
    }
    newSubPoint(pid,index){
        let points=this.state.points;
        let newSubPointItem={
            id:0,
            pid:0,
            status:'init'
        };
        points[index].children.push(newSubPointItem);
        this.setState({
            points:points
        });
    }
    newPoint(){
        var newPoint={
            id:0,
            pid:0,
            keyword:'',
            status:'init',
            children:[]
        };
        newPoint.pid=this.state.id;
        let points=this.state.points;
        points.push(newPoint);
        this.setState({
            points:points
        })
    }
    handleInputChange(event,index){
        let points=this.state.points;
        points[index].keyword=event.target.value;
        this.setState({
            points:points
        });
    }
    handleSelectorChange(newStatus,index){
        let points=this.state.points;
        if (!points[index].id){
            points[index].status=newStatus;
            this.setState({
                points:points
            });
        }else{
            // todo 这里还差直接修改数据库的部分
        }
    }
    savePoint(index){

    }
    deletePoint(index,force=false){

    }
    openNewPage(){

    }
    showMoreFile(){

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
                                        onChange={(e)=>this.handleInputChange(e,outsideIndex)}
                                    />
                                </Row>
                            }
                        >
                            <Card
                                className={"actions"}
                                style={{backgroundColor:backgroundColor}}
                            >
                                <Card.Grid className={"icons"}>
                                    <PlusCircleOutlined
                                        onClick={()=>this.newSubPoint(Item.id,outsideIndex)}
                                    />
                                </Card.Grid>
                                <Card.Grid className={"icons"}>
                                    <SaveOutlined />
                                </Card.Grid>
                                <Card.Grid>
                                    <Select
                                        value={Item.status}
                                        className={Item.status}
                                        onChange={(value)=>this.handleSelectorChange(value,outsideIndex)}
                                    >
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
                                <Card.Grid className={"icons"}>
                                    <FileMarkdownOutlined />
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