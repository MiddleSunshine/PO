import React from "react";
import {Card, Row,Col,Modal} from "antd";
import config from "../config/setting";
import "../css/WordChecCard.css"
import {CheckCircleOutlined,InfoCircleOutlined,CloseCircleOutlined} from "@ant-design/icons"
class CardBody extends React.Component{
    render() {
        return(
            <Row className={"WordCheckCardBody"}>
                <Col span={24}>
                    <h3>{this.props.word}</h3>
                </Col>
            </Row>
        )
    }
}

export class WordCheckCard extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:props.id,
            showString:props.showString,
            status:1, // 1 default 2 success 3 fail 4 info
            showModal:false,
            sentences:[]
        }
        this.success=this.success.bind(this);
        this.fail=this.fail.bind(this);
        this.info=this.info.bind(this);
        this.recordResult=this.recordResult.bind(this);
    }
    success(){
        this.recordResult(this.state.id,2);
    }
    info(){
        fetch(config.back_domain+"/index.php?action=Sentence&method=GetSentenceByWordId&word_id="+this.state.id)
            .then((res)=>{
                res.json().then((json)=>{
                    this.setState({
                        showModal:true,
                        sentences:json.Data,
                        status:4
                    })
                })
            })
    }
    fail(){
        this.recordResult(this.state.id,3);
    }
    recordResult(word_id,nextStatus){
        let check_result='success';
        if (nextStatus==3){
            check_result='fail';
        }
        fetch(
            config.back_domain+"/index.php?action=CheckLog&method=AddCheckLog",
            {
                method:"post",
                mode:"cors",
                body:JSON.stringify({
                    Word_ID:word_id,
                    check_result:check_result
                })
            }
        ).then(()=>{
            this.setState({
                status:nextStatus
            });
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            showString:nextProps.showString
        })
    }

    render() {
        let component=<div></div>
        switch (this.state.status){
            case 1:
                component=<Card.Grid>
                    <CardBody word={this.state.showString} />
                    <Row>
                        <Col span={8}>
                            <CheckCircleOutlined
                                style={{color:"#52C41A"}}
                                onClick={()=>this.success()}
                            />
                        </Col>
                        <Col span={8}>
                            <InfoCircleOutlined
                                style={{color:"#1890FF"}}
                                onClick={()=>this.info()}
                            />
                        </Col>
                        <Col span={8}>
                            <CloseCircleOutlined
                                style={{color:"#FF4D4F"}}
                                onClick={()=>this.fail()}
                            />
                        </Col>
                    </Row>
                </Card.Grid>
                break;
            case 2:
                component=<SuccessCheckBord showString={this.state.showString} />
                break;
            case 3:
                component=<FailCheckBord showString={this.state.showString} />
                break;
            case 4:
                component=<Card.Grid className={"info"}>
                    <CardBody word={this.state.showString} />
                    <Row>
                        <Col span={12}>
                            <CheckCircleOutlined
                                style={{color:"#52C41A"}}
                                onClick={()=>this.success()}
                            />
                        </Col>
                        <Col span={12}>
                            <CloseCircleOutlined
                                style={{color:"#FF4D4F"}}
                                onClick={()=>this.fail()}
                            />
                        </Col>
                    </Row>
                </Card.Grid>
                break;
        }
        return <div>
            {component}
            <div>
                <Modal
                    visible={this.state.showModal}
                    title={"Sentences List"}
                    footer={null}
                    onCancel={()=>{
                        this.setState({
                            showModal:false
                        })
                    }}
                >
                    {this.state.sentences.map((Item)=>{
                        return <p key={Item.ID}><a target={"_blank"} href={config.front_domain+"/sentence/edit/"+Item.ID}>{Item.sentence}</a></p>
                    })}
                </Modal>
            </div>
        </div>;
    }
}

class SuccessCheckBord extends React.Component{
    render() {
        return (
            <Card.Grid className={"success"}>
                <CardBody word={this.props.showString} />
            </Card.Grid>
        );
    }

}

class InfoCheckBord extends React.Component{
    render() {
        return (
            <Card.Grid className={"info"}>
                <CardBody word={this.props.showString} />
            </Card.Grid>
        );
    }
}

class FailCheckBord extends React.Component{
    render() {
        return (
            <Card.Grid className={"fail"}>
                <CardBody word={this.props.showString} />
            </Card.Grid>
        );
    }
}