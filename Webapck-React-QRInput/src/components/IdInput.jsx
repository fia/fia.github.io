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
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return fmt;
}

class IdInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idList: [
                // { qrId: "sw123123", time: 1521696263428 },
                // { qrId: "sw222222", time: 1521696263423 }
            ],
            info: ""
        };
        this.addQrId = this.addQrId.bind(this);
        this.delQrId = this.delQrId.bind(this);
        this.exportData = this.exportData.bind(this);
        this.importData = this.importData.bind(this);
        this.importDataClick = this.importDataClick.bind(this);
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
        // 通过qrId值判断是否重复
        const that = this;
        function arrayIsRepeat(arr, arrProp) {
            let arrObject = {};
            let arrTemp = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (!arrObject[element[arrProp]]) {
                    arrObject[element[arrProp]] = true;
                    arrTemp.push(element);
                }else{
                    return false;
                }
            }
            return true;
        }
        if(!arrayIsRepeat(this.state.idList, "qrId")){ 
            that.setState({ info: "请删除重复后再导出" });
            return false;
        }
        // 通过ClassName判断是否重复，不利于组件解耦
        // if (document.getElementsByClassName("exist").length > 0) {
        //     this.setState({ info: "请删除重复后再导出" });
        //     return false;
        // }
        // 代码地址http://www.zhangxinxu.com/wordpress/2017/07/js-text-string-download-as-html-json-file/
        function funDownload(filename, content) {
            // 创建隐藏的可下载链接
            var eleLink = document.createElement("a");
            eleLink.download = filename;
            eleLink.style.display = "none";
            // 字符内容转变成blob地址
            var blob = new Blob([content]);
            eleLink.href = URL.createObjectURL(blob);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);
        }
        const now = new Date();
        funDownload(
            "条码扫码记录器数据备份_" +
                dateFtt("yyyy-MM-dd hh:mm:ss", now) +
                ".txt",
            JSON.stringify(this.state.idList)
        );
    }
    importData() {
        // 代码地址https://blog.csdn.net/zdavb/article/details/50266215
        let importData = "";
        const that = this;
        const selectedFile = document.getElementById("files").files[0]; //获取读取的File对象
        const name = selectedFile.name; //读取选中文件的文件名
        const size = selectedFile.size; //读取选中文件的大小
        // console.log("文件名:" + name + "大小：" + size);
        const reader = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
        reader.readAsText(selectedFile); //读取文件的内容

        // 通过qrId值去重
        function arrayRemoveRepeat(arr, arrProp) {
            let arrObject = {};
            let arrTemp = [];
            arr.forEach(item => {
                if (!arrObject[item[arrProp]]) {
                    arrObject[item[arrProp]] = true;
                    arrTemp.push(item);
                }
            });
            return arrTemp;
        }

        reader.onload = function() {
            // console.log(this.result); //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
            importData = this.result;
            let listDate = [];
            if (that.state.idList != "") {
                listDate = that.state.idList;
            }
            listDate = [...listDate, ...JSON.parse(importData)];
            // 此去重方法不适合对象数组
            // listDate = [...new Set(listDate)];
            listDate = arrayRemoveRepeat(listDate, "qrId");
            that.setState({
                idList: listDate,
                info: `${name} 导入成功！`
            });
        };
    }
    importDataClick() {
        document.getElementById("files").click();
    }
    render() {
        // 输入框
        return (
            <div>
                <h1>条码扫码记录器 v0.2.4</h1>
                <fieldset>
                    <legend>功能说明：</legend>
                    <p>选定输入框，扫码枪单条扫码录入，在本地浏览器记录录入数据，高亮重复数据，通过导出导入数据文本，实现不同浏览器数据互通</p>
                </fieldset>
                <fieldset disabled="disabled">
                    <legend>使用说明：</legend>
                    <ul>
                        <li>- 新添加数据只在单台电脑及单独浏览器上储存</li>
                        <li>
                            - 不同电脑及不同浏览器可以通过原始备份导出数据，再导入备份数据完成，然后可以继续添加数据。
                        </li>
                        <li>
                            - 支持导入多份数据，自动去除多份数据中重复部分。
                        </li>
                        <li>
                            - 导入备份数据会合并当前电脑浏览器页面上的所有数据。
                        </li>
                        <li>
                            - 推荐使用<a
                                href="https://www.google.com/chrome/"
                                target="_blank"
                            >
                                Chrome浏览器
                            </a>
                        </li>
                    </ul>
                </fieldset>
                <div>
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
                    {/* 导入框隐藏 */}
                    <input
                        type="file"
                        id="files"
                        style={{ display: "none" }}
                        onChange={this.importData}
                    />
                    <button className="btn" onClick={this.importDataClick}>
                        导入备份数据
                    </button>
                    <InfoMsg info={this.state.info} />
                </div>
                <QrIdTable
                    qrIdList={this.state.idList}
                    delButton={this.delQrId}
                />
            </div>
        );
    }
}
function InfoMsg({ info }) {
    // console.log(info);
    if (info.length > 0) {
        return <p className="info">{info}</p>;
    }
    return null;
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
        // 将qrId逐个添加入exist空对象中，通过对象中是否存在qrId值来判断是否有重复
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
