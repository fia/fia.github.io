import React from "react";
import "./IdInput.scss";
class IdInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idList: [
                // { qrId: "sw123123", time: 1521696263428 },
                // { qrId: "sw222222", time: 1521696263423 }
            ]
        };
        this.addQrId = this.addQrId.bind(this);
        this.delQrId = this.delQrId.bind(this);
    }
    addQrId(e) {
        // 延时获取input,重复刷新setTimeout
        let newQrId = e.target.value;
        
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            let items = this.state.idList;
            let item = {
                qrId: newQrId,
                time: Date.now()
            };
            this.setState({
                idList: [...items, item]
            });
            this.refs.inputId.value = "";
        }, 200);
        // 通过delay设定单位时间内输入情况，最后一个字符输入后开始延时，无clearTimeout的情况下，出现多个定时器同时执行。
        // this.delay = false;
        // // clearTimeout(this.timer);
        // const items = this.state.idList;
        // const newQrId = e.target.value;
        // const item = {
        //     qrId: newQrId,
        //     time: Date.now()
        // };
        // if (!this.delay) {
        //     this.delay = true;
        //     this.timer = setTimeout(() => {
        //         this.setState({
        //             idList: [...items, item]
        //         });
        //         this.refs.inputId.value = "";
        //         this.delay = false;
        //     }, 1000);
        // }
    }
    delQrId(qrIdTime) {
        // 通过唯一时间戳删除，
        // 是否有唯一key值来删除？
        this.setState({
            idList: this.state.idList.filter(result => {
                return result["time"] !== qrIdTime;
            })
        });
    }
    render() {
        return (
            <div>
                <input ref="inputId" type="text" onChange={this.addQrId} />
                <QrIdTable
                    qrIdList={this.state.idList}
                    delButton={this.delQrId}
                />
            </div>
        );
    }
}

class QrIdRow extends React.Component {
    render() {
        const qrIdItem = this.props.qrIdItem;
        const qrDate = new Date(qrIdItem.time);
        /**************************************时间格式化处理************************************/
        function dateFtt(fmt, date) {
            //author: meizz
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                S: date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(
                    RegExp.$1,
                    (date.getFullYear() + "").substr(4 - RegExp.$1.length)
                );
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length == 1
                            ? o[k]
                            : ("00" + o[k]).substr(("" + o[k]).length)
                    );
            return fmt;
        }

        return (
            <tr className={this.props.isExist ? "exist" : ""}>
                <td>{this.props.qrIdItemIndex}</td>
                <td>{qrIdItem.qrId}</td>
                <td>{dateFtt("yyyy-MM-dd hh:mm:ss", qrDate)}</td>
                {this.props.isExist ? (
                    <td>
                        <button
                            onClick={() => this.props.delButton(qrIdItem.time)}
                        >
                            删除
                        </button>
                    </td>
                ) : (
                    <td />
                )}
            </tr>
        );
    }
}
class QrIdTable extends React.Component {
    render() {
        const qrIdList = this.props.qrIdList;
        let exist = {};
        let existId = false;
        const rows = [];
        qrIdList.forEach((qrId, index) => {
            if (exist[qrId.qrId]) {
                existId = true;
            } else {
                exist[qrId.qrId] = true;
                existId = false;
            }
            rows.push(
                <QrIdRow
                    key={qrId.time}
                    qrIdItem={qrId}
                    qrIdItemIndex={index + 1}
                    isExist={existId}
                    delButton={this.props.delButton}
                />
            );
        });
        rows.reverse();
        return (
            <table>
                <tbody>
                    <tr>
                        <th>序号</th>
                        <th>条码</th>
                        <th>扫描时间</th>
                        <th />
                    </tr>
                    {rows}
                </tbody>
            </table>
        );
    }
}
export default IdInput;
