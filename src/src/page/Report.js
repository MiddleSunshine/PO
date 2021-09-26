import React from "react";
import ReactECharts from "echarts-for-react";
import config from "../config/setting";
import { DatePicker,Button } from 'antd';
import Road from "../component/road";
import {requestApi} from "../config/functions";

class Report extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:[],
            xData:[],
            startTime:'',
            endTime:''
        }
        this.getData=this.getData.bind(this);
    }
    componentDidMount() {
        this.getData();
    }

    getData(){
        requestApi("/poWork.php?action=Report&method=Index",{
            mode:"cors",
            method:"post",
            body:JSON.stringify({
                startTime:this.state.startTime,
                endTime:this.state.endTime
            })
        }).then((res)=>{
            res.json().then((json)=>{
                this.setState({
                    data:json.Data.points,
                    xData:json.Data.xData
                })
            })
        })
    }
    render() {
        let option = {
            title: {
                text: 'Point Report'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: config.statusMap.map((Item)=>{
                    return Item.value;
                })
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.state.xData
            },
            yAxis: {
                type: 'value'
            },
            series: this.state.data
        };
        return(
            <div className="container">
                <Road />
                <hr/>
                <div className="row">
                    <DatePicker.RangePicker
                        format="YYYY-MM-DD"
                        onChange={(date,dateString)=>{
                            this.setState({
                                startTime:dateString[0],
                                endTime:dateString[1]
                            })
                        }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        type={"primary"}
                        onClick={()=>this.getData()}
                    >
                        Search
                    </Button>
                </div>
                <div className="row">
                    <ReactECharts
                        option={option}
                    />
                </div>

            </div>

        )
    }
}

export default Report