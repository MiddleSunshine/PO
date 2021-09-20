import React from "react";
import config from "../config/setting";
import {Table, Layout, Row, Col, Button,Modal} from 'antd'
import {SketchOutlined} from '@ant-design/icons'
import WillingDetail from "../component/WillingDetail";

const {Header, Footer,Content} = Layout;

class Willing extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:[],
            showModal:false,
            editID:'',
        }
        this.getWillingList=this.getWillingList.bind(this);
        this.switchModal=this.switchModal.bind(this);
    }
    componentDidMount() {
        this.getWillingList();
    }

    switchModal(open=true){
        (async ()=>{})()
            .then(()=>{
                this.setState({
                    showModal:open
                });
            }).then(()=>{
                this.getWillingList();
        })
    }

    updateWilling(index){
        let ID=0;
        if (index!==-1){
            ID=this.state.data[index].ID;
        }
        (async ()=>{})().then(()=>{
            this.setState({
                editID:ID
            });
        }).then(()=>{
            this.switchModal();
        })
    }

    getWillingList(){
        fetch(config.back_domain+"/index.php?action=Willing&method=list")
            .then((res)=>{
                res.json().then((json)=>{
                    this.setState({
                        data:json.Data
                    })
                })
            })
    }
    render(){
        return(
            <Layout className={"po_index"}>
                <Header>
                    <Row align={"middle"} justify={"start"}>
                        <Col span={1}>
                            <SketchOutlined style={{color:"white",fontSize:"35px"}} />
                        </Col>
                        <Col span={23}>
                            <h1 style={{lineHeight: "64px"}}>Desire is normal</h1>
                        </Col>
                    </Row>
                </Header>
                <Content style={{paddingLeft:"15px",paddingRight:"15px"}}>
                    <Button
                        type={"primary"}
                        onClick={()=>this.updateWilling(-1)}
                    >
                        New Willing
                    </Button>
                    <hr/>
                    <Table
                        dataSource={this.state.data}
                        columns={[
                            {
                                title:"CreateTime",
                                dataIndex: "AddTime",
                                key:"ID",
                            },
                            {
                                title:"Title",
                                dataIndex:"note",
                                key:"ID"
                            },
                            {
                                title:"Point",
                                dataIndex: "Point",
                                key:"ID"
                            },
                            {
                                title:"Status",
                                dataIndex: "status",
                                key:"ID",
                                onFilter:(value,record)=>{
                                    return value===record.status
                                },
                                filters:config.willingStatus.map((Item)=>{
                                    return {
                                        text:Item.label,
                                        value:Item.value
                                    }
                                })
                            },
                            {
                                title:"Option",
                                dataIndex:'status',
                                render:(text,record,index)=>{
                                    let show;
                                    switch (record.status){
                                        case "new":
                                            show="Exchange";
                                            break;
                                        default:
                                            show="Exchanged @ "+record.LastUpdateTime;
                                            break;
                                    }
                                    return(
                                        <Button
                                            type={"primary"}
                                            onClick={()=>{
                                                this.updateWilling(index)
                                            }}
                                        >
                                            {show}
                                        </Button>
                                    )
                                }
                            }
                        ]}
                    />
                </Content>
                <Footer>
                    <Modal
                        visible={this.state.showModal}
                        onOk={()=>this.switchModal(false)}
                        onCancel={()=>this.switchModal(false)}
                    >
                        <WillingDetail
                            ID={this.state.editID}
                        />
                    </Modal>
                </Footer>
            </Layout>
        )
    }
}

export default Willing