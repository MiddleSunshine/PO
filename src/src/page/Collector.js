import React from 'react'
import Point from "../component/point";
import {Card,Select,Row,Col,Button,message,Switch} from "antd";
import "./../css/Collector.css"
import {SaveOutlined,PlusCircleOutlined,DeleteOutlined,UnorderedListOutlined,FileMarkdownOutlined,SketchOutlined} from '@ant-design/icons';
import config from "../config/setting";

const { Option } = Select;

class Collector extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:props.match.params.pid,
            statusFilter:['new','solved'],
            points:[
                // {
                //     id:0,
                //     keyword:'输入内容',
                //     status:'solved',
                //     children:[
                //         {
                //             id:0
                //         }
                //     ]
                // }
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
        this.getPointsByPID=this.getPointsByPID.bind(this);
    }
    componentDidMount() {
        this.getPointsByPID(this.state.id);
    }
    // 初始化页面
    getPointsByPID(pid){
        fetch(config.back_domain+"/index.php?action=Points&method=Index&id="+pid,{
            method:"post",
            mode:"cors",
            body:JSON.stringify({
                status:this.state.statusFilter.join(",")
            })
        })
            .then((res)=>{
            res.json().then((json)=>{
                this.setState({
                    points:json.Data.points?json.Data.points:[]
                })
            })
        })
    }
    // 创建新的孩子节点
    newSubPoint(pid,index){
        let points=this.state.points;
        let newSubPointItem={
            ID:0,
            pid:0,
            status:'init'
        };
        points[index].children.push(newSubPointItem);
        this.setState({
            points:points
        });
    }
    // 创建新的兄弟节点
    newPoint(){
        var newPoint={
            ID:0,
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
    // 处理兄弟节点的输入框修改
    handleInputChange(event,index){
        let points=this.state.points;
        points[index].keyword=event.target.value;
        this.setState({
            points:points
        });
    }
    // 处理兄弟节点的select框修改
    handleSelectorChange(newStatus,index){
        let points=this.state.points;
        if (!points[index].ID){
            points[index].status=newStatus;
            this.setState({
                points:points
            });
        }else{
            (async ()=>{
                let points=this.state.points;
                points[index].status=newStatus;
                this.setState({
                    points:points
                });
            })().then(
                ()=>{
                    this.savePoint(index);
                }
            );
        }
    }
    // 处理分值修改
    handlePointChange(event,index){
        let points=this.state.points;
        points[index].Point=event.target.value;
        this.setState({
            points:points
        });
    }
    // 保存效果
    savePoint(index){
        let point=this.state.points[index];
        if (point.status==='init'){
            point.status='new';
        }
        fetch(
            config.back_domain+"/index.php?action=Points&method=Save",
            {
                method:"post",
                mode:"cors",
                body:JSON.stringify({
                    point,
                    PID:this.state.id
                })
            }
        )
            .then((res)=>{
                res.json().then((json)=>{
                    if (!json.Status){
                        message.error(json.Message);
                    }else{
                        point.ID=json.Data.ID;
                        let points=this.state.points;
                        points[index]=point;
                        this.setState({
                            points:points
                        })
                    }
                })
            })
    }
    // 删除节点
    deletePoint(index,force=false){
        let point=this.state.points[index];
        if (point.ID){
            (async ()=>{
                let points=this.state.points;
                points[index].Deleted=1;
                this.setState({
                    points:points
                });
            })().then(()=>{
                this.savePoint(index);
            });
        }else{
            let points=this.state.points.filter((Item,i)=>{
                return i!==index;
            });
            this.setState({
                points:points
            });
        }
    }
    // 打开新的页面
    openNewPage(index){
        let point=this.state.points[index];
        if(!point.ID){
            this.savePoint(index);
            point=this.state.points[index];
        }
        window.open(config.front_domain+"/points/"+point.ID);
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
                            defaultValue={this.state.statusFilter}
                            onChange={(value)=>{
                                this.setState({
                                    statusFilter:value
                                });
                            }}
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
                                <Card.Grid
                                    className={"icons"}
                                    onClick={()=>this.openNewPage(outsideIndex)}
                                >
                                    <span>ID:{Item.ID}</span>
                                </Card.Grid>
                                <Card.Grid className={"icons"}>
                                    <input
                                        value={Item.Point}
                                        style={{width:"100%"}}
                                        placeholder={"Point"}
                                        onChange={(e)=>this.handlePointChange(e,outsideIndex)}
                                    />
                                </Card.Grid>
                                <Card.Grid className={"icons"}>
                                    <SketchOutlined />
                                </Card.Grid>
                                <Card.Grid
                                    className={"icons"}
                                    onClick={()=>this.newSubPoint(Item.ID,outsideIndex)}
                                >
                                    <PlusCircleOutlined/>
                                </Card.Grid>
                                <Card.Grid
                                    className={"icons"}
                                    onClick={()=>this.savePoint(outsideIndex)}
                                >
                                    <SaveOutlined/>
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
                                <Card.Grid
                                    className={"icons"}
                                    onClick={()=>this.deletePoint(outsideIndex)}
                                >
                                    <DeleteOutlined/>
                                </Card.Grid>
                                <Card.Grid className={"icons"}>
                                    <Switch
                                        checkedChildren={"detail"}
                                        unCheckedChildren={"hide"}
                                        defaultChecked
                                        value={Item.showDetail?Item.showDetail:true}
                                        onChange={(newValue)=>{
                                            let points=this.state.points;
                                            points[outsideIndex].showDetail=newValue;
                                            this.setState({
                                                points:points
                                            });
                                        }}
                                    />
                                </Card.Grid>
                                <Card.Grid className={"icons"}>
                                    <FileMarkdownOutlined />
                                </Card.Grid>
                            </Card>
                            {(Item.showDetail===undefined?true:Item.showDetail)?Item.children.map((childItem,index)=>{
                                return(
                                    <Point
                                        key={index}
                                        pid={Item.ID}
                                        id={childItem.ID}
                                    />
                                )
                            }):''}
                        </Card>
                    )
                })}
            </div>
        )
    }
}

export default Collector