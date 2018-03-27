import React from "react";
import "./IdInput.scss";

/*时间格式化处理*/
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
        this.exportData = this.exportData.bind(this);
    }
    componentWillMount() {
        // 载入本地存储数据
        if (localStorage.getItem("idList")) {
            this.setState({
                idList: JSON.parse(localStorage.getItem("idList"))
            });
        }
    }
    componentDidUpdate() {
        // 更新本地存储数据
        localStorage.setItem("idList", JSON.stringify(this.state.idList));
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
    // 备份txt导出
    exportData() {
        // 代码地址https://segmentfault.com/q/1010000007355852
        function fakeClick(obj) {
            var ev = document.createEvent("MouseEvents");
            ev.initMouseEvent(
                "click",
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
            obj.dispatchEvent(ev);
        }
        function exportRaw(name, data) {
            var urlObject = window.URL || window.webkitURL || window;
            var export_blob = new Blob([data]);
            var save_link = document.createElementNS(
                "http://www.w3.org/1999/xhtml",
                "a"
            );
            save_link.href = urlObject.createObjectURL(export_blob);
            save_link.download = name;
            fakeClick(save_link);
        }
        const now = new Date();
        exportRaw(
            "条码扫码记录器数据备份_" +
                dateFtt("yyyy-MM-dd hh:mm:ss", now) +
                ".txt",
            JSON.stringify(this.state.idList)
        );
    }
    render() {
        // 输入框
        return (
            <div>
                <h1>条码扫码记录器 v0.1</h1>
                <h2>使用说明：</h2>
                <ul>
                    <li>1.目前只能在单台电脑及单独浏览器上使用才能有存储功能</li>
                    <li>2.推荐使用<a href="https://www.google.com/chrome/" target="_blank">Chrome浏览器</a></li>
                </ul>
                <input
                    className="qr-input"
                    placeholder="请点击此输入框开始扫码录入"
                    ref="inputId"
                    type="text"
                    onChange={this.addQrId}
                />
                <button className="btn" onClick={this.exportData}>
                    备份导出数据
                </button>
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

        // 列表
        return (
            <tr className={this.props.isExist ? "exist" : ""}>
                <td>{this.props.qrIdItemIndex}</td>
                <td>{qrIdItem.qrId}</td>
                <td>{dateFtt("yyyy-MM-dd hh:mm:ss", qrDate)}</td>
                <td>
                    <button onClick={() => this.props.delButton(qrIdItem.time)}>
                        删除
                    </button>
                </td>
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
