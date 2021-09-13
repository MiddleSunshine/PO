import React from "react";
import config from "../config/setting";
import "../css/symbolKeybord.css"
import {Button, message} from "antd";
import {FormOutlined, AudioOutlined, ClearOutlined} from "@ant-design/icons";
import {symbolMap, getSymbolMap, saveSymbol, getSymbolString, getSymbolSaveData} from "./symbol";

// https://www.hujiang.com/c/wx/p1288247/


class PhoneticSymbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            media: '',
            symbols: [],
            sounds: '',
            symbolMap: getSymbolMap()
        }
        this.playMp3 = this.playMp3.bind(this);
        this.updateWords = this.updateWords.bind(this);
        this.saveWords = this.saveWords.bind(this);
        this.playSound = this.playSound.bind(this);
        this.cleanWords = this.cleanWords.bind(this);
    }

    playMp3(source, img) {
        let symbol = img.slice(1, -1);
        let symbols = this.state.symbols;
        symbols.push(symbol);
        this.setState({
            media: config.front_domain + "/media/" + source,
            symbols: symbols
        });
    }

    updateWords(index) {
        let newSymbols = this.state.symbols.filter((current, i) => {
            return i !== index;
        });
        this.setState({
            symbols: newSymbols
        })
    }

    saveWords() {
        let symbols = this.state.symbols.join(",");
        saveSymbol(symbols);
        message.success("Save Success: / " + getSymbolString() + " /");
    }

    cleanWords() {
        this.setState({
            symbols: []
        })
    }

    playSound(index = 0) {
        if (index >= this.state.symbols.length) {
            return false;
        }
        let sounds = this.state.symbols.map((key) => {
            return this.state.symbolMap[key];
        });
        this.setState({
            sounds: config.front_domain + "/media/" + sounds[index]
        });
        setTimeout(() => this.playSound(index + 1), 500);
    }

    componentDidMount() {
        let symbolList = getSymbolSaveData();
        if (symbolList) {
            this.setState({
                symbols: symbolList.split(',')
            })
        }

    }

    render() {
        return (
            <div className={"table-responsive symbol-keyboard"}>
                <div>
                    <Button
                        style={{marginRight: "10px"}}
                        type={"primary"}
                        icon={<FormOutlined/>}
                        onClick={() => this.saveWords()}
                    >
                        Save
                    </Button>
                    <Button
                        icon={<AudioOutlined/>}
                        type={"primary"}
                        style={{marginRight: "10px"}}
                        onClick={() => this.playSound()}
                    >
                    </Button>
                    <ClearOutlined style={{marginRight: "10px"}} onClick={() => this.cleanWords()}/>
                    <span>/</span>
                    {this.state.symbols.map((item, index) => {
                        return <span onClick={() => this.updateWords(index)}>{item}</span>;
                    })}
                    <span>/</span>
                </div>
                <div>
                    <table className={"table table-hover table-condensed symbol-keybord"}>
                        <tr>
                            <td className={"symbol"} rowSpan={3}>元音</td>
                            <td className={"symbol"} rowSpan={2}>单元音</td>
                            <td className={"symbol"}>长元音</td>
                            <td>
                                {symbolMap.yuanyin.danyuanyin.changyuanyin.map((item) => {
                                    return <span onClick={() => this.playMp3(item.media, item.img)}
                                                 key={item.id}>{item.img}</span>
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className={"symbol"}>短元英</td>
                            <td>
                                {
                                    symbolMap.yuanyin.danyuanyin.duanyuanyin.map((item) => {
                                        return <span onClick={() => this.playMp3(item.media, item.img)}
                                                     key={item.id}>{item.img}</span>
                                    })
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className={"symbol"}>双元音</td>
                            <td colSpan={2}>
                                {symbolMap.yuanyin.shuangyuanyin.map((item) => {
                                    return <span onClick={() => this.playMp3(item.media, item.img)}
                                                 key={item.id}>{item.img}</span>
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className={"symbol"} rowSpan={2}>
                                辅音
                            </td>
                            <td className={"symbol"}>
                                清辅音
                            </td>
                            <td colSpan={2}>
                                {symbolMap.fuyin.qitafuyin.map((item) => {
                                    return <span onClick={() => this.playMp3(item.media, item.img)}
                                                 key={item.id}>{item.img}</span>
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className={"symbol"}>
                                浊辅音
                            </td>
                            <td colSpan={2}>
                                {symbolMap.fuyin.zhuofuyin.map((item) => {
                                    return <span onClick={() => this.playMp3(item.media, item.img)}
                                                 key={item.id}>{item.img}</span>
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className={"symbol"}>
                                其他辅音
                            </td>
                            <td colSpan={3}>
                                {symbolMap.fuyin.qitafuyin.map((item) => {
                                    return <span onClick={() => this.playMp3(item.media, item.img)}
                                                 key={item.id}>{item.img}</span>
                                })}
                            </td>
                        </tr>
                    </table>
                </div>
                <audio style={{display: "none"}} controls={"controls"} src={this.state.media} autoplay={"autoplay"}>
                </audio>
                <audio style={{display: "none"}} controls={"controls"} autoplay={"autoplay"} src={this.state.sounds}>
                </audio>
            </div>
        )
    }
}

export default PhoneticSymbol;
