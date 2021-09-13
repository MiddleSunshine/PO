import React from 'react'
import Header from "../component/Header";
import Roads from "../component/Roads";
import config from "../config/setting";
import {WordCheckCard} from "../component/WordCheckCard";
import {Card} from "antd";

class CheckList extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            words: []
        }
        this.getWords=this.getWords.bind(this);
    }
    componentDidMount() {
        this.getWords();
    }

    getWords(){
        fetch(config.back_domain+"/index.php?action=Check&method=List")
            .then((response)=>{
                response.json().then((json)=>{
                    this.setState({
                        words:json.Data
                    })
                })
            })
    }
    render() {
        return (
            <diw className="container">
                <div className="row">
                    <Header subTitle={"Check List"}/>
                </div>
                <div className="row">
                    <Roads
                        roads={config.common_road}
                    />
                </div>
                <div className="row WordCheckCard">
                    <Card>
                    {this.state.words.map((word)=>{
                        return(
                            <WordCheckCard
                                key={word.ID}
                                id={word.ID}
                                showString={word.word}
                            />
                        )
                    })}
                    </Card>
                </div>
            </diw>
        );
    }
}

export default CheckList;