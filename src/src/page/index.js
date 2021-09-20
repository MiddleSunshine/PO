import React from 'react'
import {Layout, Row, Col, Button} from "antd";
import "../css/index.css"
import {DingdingOutlined} from '@ant-design/icons';
import config from "../config/setting";

const {Header, Footer, Content} = Layout;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            points:[],
            searchKeyWord:''
        }
        this.searchPoints=this.searchPoints.bind(this);
    }
    searchPoints(){
        fetch(config.back_domain+"/index.php?action=Points&method=Search",{
            method:"post",
            mode:"cors",
            body:JSON.stringify({
                keyword:this.state.searchKeyWord
            })
        })
            .then((res)=>{
                res.json().then((json)=>{
                    this.setState({
                        points:json.Data
                    })
                })
            })
    }
    render() {
        return (
            <Layout className={"po_index"}>
                <Header>
                    <Row align={"middle"} justify={"start"}>
                        <Col offset={1} span={24}>
                            <Row align={"middle"} justify={"start"}>
                                <Col span={1}>
                                    <h1><DingdingOutlined/></h1>
                                </Col>
                                <Col span={23}>
                                    <h1 style={{lineHeight: "64px"}}>Remember Why You Start</h1>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Header>
                <Content>
                    <Row align={"middle"} justify={"center"}>
                        <h2>Point Organization</h2>
                    </Row>
                    <Row align={"middle"} justify={"start"}>
                        <Col offset={8} span={7}>
                            <input
                                value={this.state.searchKeyWord}
                                onChange={(e)=>{
                                    this.setState({
                                        searchKeyWord:e.target.value
                                    })
                                }}
                            />
                        </Col>
                        <Col span={1}>
                            <Button
                                type={"primary"}
                                onClick={()=>this.searchPoints()}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{paddingTop:"5px"}}>
                        <Col offset={8} span={2}>
                            <Button
                                type={"link"}
                                href={"./points/0"}
                                target={"_blank"}
                            >
                                Point Index
                            </Button>
                        </Col>
                        <Col span={2}>
                            <Button
                                type={"link"}
                            >
                                Summary
                            </Button>
                        </Col>
                    </Row>
                </Content>
                <Footer>
                    {this.state.points.map((Item)=>{
                        return(
                            <Row>
                                <Col offset={8} span={16}>
                                    <Button
                                        type={"link"}
                                        href={"./points/"+Item.ID}
                                        target={"_blank"}
                                    >
                                        {Item.status} / {Item.keyword}
                                    </Button>
                                </Col>
                            </Row>
                        )
                    })}
                </Footer>
            </Layout>
        );
    }
}

export default Index