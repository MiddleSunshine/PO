import React from 'react'
import ReactECharts from 'echarts-for-react';
import config from "../../config/setting";
import {fetch} from "whatwg-fetch";

class WordsCharts extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            days:[],
            new_words:[],
            review_words:[],
            amount_words:[],
            rest_words:[]
        }
        this.getSummaryData=this.getSummaryData.bind(this);
        this.getOption=this.getOption.bind(this);
    }
    getSummaryData(){
        return fetch(config.back_domain+"/index.php?action=Summary&method=WordsSummary").then((res)=>{
            return res.json();
        });
    }
    getOption(){
        return {
            title: {
                text: 'Words Summary'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Review Words','New Words' ,'Amount Words','Rest Words']
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
                data: this.state.days
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Review Words',
                    type: 'line',
                    stack: '总量',
                    data: this.state.review_words
                },
                {
                    name: 'New Words',
                    type: 'line',
                    stack: '总量',
                    data: this.state.new_words
                },
                {
                    name: 'Amount Words',
                    type: 'line',
                    stack: '总量',
                    data: this.state.amount_words
                },
                {
                    name: 'Rest Words',
                    type: 'bar',
                    stack: '总量',
                    data: this.state.rest_words
                }
            ]
        };
    }
    componentDidMount() {
        this.getSummaryData().then((res)=>{
            this.setState({
                days:res.Data.days,
                new_words:res.Data.new_words,
                review_words:res.Data.review_words,
                amount_words:res.Data.amount_words,
                rest_words:res.Data.rest_words
            })
        });
    }
    render() {
        return (
            <div className="container">
                <ReactECharts
                    option={this.getOption()}
                />
            </div>
        )
    }
}

export default WordsCharts;