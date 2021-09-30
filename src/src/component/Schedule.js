import React from 'react'
import { Calendar, Badge } from 'antd';

class Schedule extends React.Component{
    constructor(props){
        super(props);
        this.state={
            plans:[
            ]        
        };
        this.dayRender=this.dayRender.bind(this);
    }
    dayRender(dateMoment){
        let date=dateMoment.format("YYYY-MM-DD");
        return <span>{date}</span>
    }
    render(){
        return <Calendar
            dateCellRender={this.dayRender}
         />;
    }
}

export default Schedule;
