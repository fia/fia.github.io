var tipsInfo = {
    noFace: ["这视野都看不清人脸，啥情况？", "扫描不到人类，然并卵", "瞎了狗眼，人类呢？", "良辰不喜欢没脸的生物"],
    Male: [
        ["这位老大请", "没啥好说的，请客吧！一群人里数你地位最高了，肯定不在乎小钱"],
        ["大哥实在人，大家请他吃饭！", "俗话说实在人有实在福，大家请他吃饭，沾沾好运。"],
        ["这位宝贝请客！", "看一圈都没他可爱！"],
        ["这位帅哥请客！", "没啥好说的，请客吧！有女神陪伴男人肯定不在乎这点小钱"],
        ["面有福相 请客！", "土豪别谦虚，快出生撒钱吧！"],
        ["帅哥，快喊基友请客！", "备胎没有的话，基友还是有那么一两个的，随便找个来付钱吧！"],
        ["男神潜力股 自己请自己吧！", "潜力股就喜欢自己请自己，男人的骄傲！"],
        ["地位够高，快请他吃饭！", "瞧这面相地位明显不低，注定是别人请他吃饭的命！"],
        ["颜值不够高，你请客吧！", "看自己的颜值，含着泪也要请！"],
        ["大人物请客！", "看这架势，妥妥大人物，必须请客！"],
        ["找个暖男请客吧！", "你天生就是暖男的菜"],
        ["让备胎请客！", "养胎一日，用胎一时！"],
        ["他请客！", "不请客，把钱拿来！"],
        ["真女人！自会有人请客！", "一般真正的女人，随时随地都会有人抢着买单。"]
    ],
    Female: [
        ["这位老大请", "没啥好说的，请客吧！一群人里数你地位最高了，肯定不在乎小钱"],
        ["这位宝贝请客！", "看一圈都没他可爱！"],
        ["女神在此，快请他吃饭！", "没啥好说的，请客吧！有女神陪伴男人肯定不在乎这点小钱"],
        ["面有福相 请客！", "土豪别谦虚，快出生撒钱吧！"],
        ["女神请客", "一群人里他最美，都被叫女神了，不请客能行么？"],
        ["地位够高，快请他吃饭！", "瞧这面相地位明显不低，注定是别人请他吃饭的命！"],
        ["颜值不够高，你请客吧！", "看自己的颜值，含着泪也要请！"],
        ["大人物请客！", "看这架势，妥妥大人物，必须请客！"],
        ["找个暖男请客吧！", "你天生就是暖男的菜"],
        ["找个暖男请客吧！", "这么美，一定有人追，找个暖男请客吧！"],
        ["美女多金，自己请自己吃", "自力更生的美女都给力！"],
        ["让备胎请客！", "养胎一日，用胎一时！"],
        ["他请客！", "不请客，把钱拿来！"],
        ["真女人！自会有人请客！", "一般真正的女人，随时随地都会有人抢着买单。"]
    ]
};
var headImg = [
    ["库克", "1.jpg"],
    ["丁磊", "2.jpg"],
    ["黄章", "3.jpg"],
    ["雷军", "4.jpg"],
    ["李嘉诚", "5.jpg"],
    ["李开复", "6.jpg"],
    ["李彦宏", "7.jpg"],
    ["刘强东", "8.jpg"],
    ["刘作虎", "9.jpg"],
    ["柳传志", "10.jpg"],
    ["罗永浩", "11.jpg"],
    ["马化腾", "12.jpg"],
    ["马云", "13.jpg"],
    ["王自如", "14.jpg"],
    ["余承东", "15.jpg"],
    ["雨果巴拉", "16.jpg"],
    ["张朝阳", "17.jpg"],
    ["周鸿祎", "18.jpg"]
];
// 上传后图片地址
var imgOption = {
    // 上传后图片的host链接
    uploadImgUrl: '',
    showImg: $(".pic_wrap img").eq(0),
    box: $(".pic_wrap").eq(0),
    sourceImg: {},
    imgFace: {},
    headUrl: "images/header/",
    headRandom: 0,
    tipsRandom: 0,
    face: 0,
    imgTip: $(".tips_box").eq(0),
    shareDesc: ''
};
var uploadImgUrl = '',
    shareLink = '',
    shareTitle = '',
    shareHeader = '',
    shareDesc = '',
    pageUrl = imgOption.pageUrl,
    showImg = imgOption.showImg,
    box = imgOption.box,
    sourceImg = imgOption.sourceImg,
    imgFace = imgOption.imgFace,
    headUrl = imgOption.headUrl,
    headRandom = imgOption.headRandom,
    tipsRandom = imgOption.tipsRandom,
    imgTip = imgOption.imgTip;
// init;
imgInit();
/**
 * 地址栏参数解析
 */
function UrlSearch() {
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?");
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}
// 根据地址栏初始第一张带脸的图片，作用于分享下的功能
function imgInit() {
    var url = new UrlSearch();
    if (url.uploadImgUrl) {
        showImg.attr("src", url.uploadImgUrl);
        // console.log(url.uploadImgUrl);
        imgFace.x = url.imgFaceX;
        imgFace.y = url.imgFaceY;
        imgFace.w = url.imgFaceW;
        imgFace.h = url.imgFaceH;
        headRandom = url.headRandom;
        tipsRandom = url.tipsRandom;
        imgLoad(url.uploadImgUrl, function() {
            // 图片载入有时间问题，通过回调解决
            switch (parseInt(url.face)) {
                case 0:
                    tipsNoFace();
                    break;
                case 1:
                    tips("Male");
                    break;
                case 2:
                    tips("Female");
                    break;
            };
        });
        // console.log(headRandom, tipsRandom, url.face);
    }
}
// iframe 回调函数
function uploadBackcall(imgUrl) {
    if (imgUrl) {
        uploadImgUrl = imgUrl;
    };
    // console.log(imgUrl);
    showImg.attr("src", uploadImgUrl);
    // console.log(showImg.width(),showImg.height());
    imgLoad(uploadImgUrl);
    $.ajax({
        url: 'http://api.eyekey.com/face/Check/checking',
        type: "POST",
        // data: "app_id=c2e0031b3b144b2a93b43841d27a9e6b&app_key=d4ac82905fad48e3b8b01fd5cc0117d1&url=" + uploadImgUrl,
        // data: "app_id=c2e0031b3b144b2a93b43841d27a9e6b&app_key=d4ac82905fad48e3b8b01fd5cc0117d1&url=http://img2.91.com/uploads/allimg/151015/10-151015094010.jpg",
        // data: "app_id=c2e0031b3b144b2a93b43841d27a9e6b&app_key=d4ac82905fad48e3b8b01fd5cc0117d1&url=http://img3.91.com/uploads/allimg/151029/745-1510291430030-L.jpg",
        data: "app_id=c2e0031b3b144b2a93b43841d27a9e6b&app_key=d4ac82905fad48e3b8b01fd5cc0117d1&url=" + uploadImgUrl,
        dataType: 'json',
        success: function(data) {
            // alert(data.face[0].position.center.x);
            // 未检测到
            if (data.message == "未检测到人脸") {
                tipsRandom = random(tipsInfo.noFace.length);
                headRandom = random(headImg.length);
                face = 0;
                shareLink = pageUrl + "?uploadImgUrl=" + uploadImgUrl + "&tipsRandom=" + tipsRandom + "&headRandom=" + headRandom + "&face=" + face;
                shareTitle = "有" + headImg[headRandom][0] + "作证，没找到你的脸！";
                shareDesc = "真没找到你的脸！";
                tipsNoFace();
            } else {
                imgFace = {
                    x: data.face[0].position.center.x,
                    y: data.face[0].position.center.y,
                    w: data.face[0].position.width,
                    h: data.face[0].position.height
                };
                tipsRandom = random(tipsInfo[data.face[0].attribute.gender].length);
                headRandom = random(headImg.length);
                tips(data.face[0].attribute.gender);
                shareLink = pageUrl + "?uploadImgUrl=" + uploadImgUrl + "&imgFaceX=" + imgFace.x + "&imgFaceW=" + imgFace.w + "&imgFaceY=" + imgFace.y + "&imgFaceH=" + imgFace.h + "&headRandom=" + headRandom + "&tipsRandom=" + tipsRandom + "&face=" + face;
                shareTitle = "有" + headImg[headRandom][0] + "作证，这回该你请客了！";
                shareDesc = tipsInfo[data.face[0].attribute.gender][tipsRandom][1];
            }
            shareHeader = pageUrl + headUrl + headImg[headRandom][1];
            // alert(shareTitle);
            wx.onMenuShareTimeline({
                title: shareTitle, // 分享标题
                link: shareLink, // 分享链接
                imgUrl: shareHeader, // 分享图标
                success: function() {
                    // alert(shareTitle);
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareAppMessage({
                title: shareTitle, // 分享标题
                link: shareLink, // 分享链接
                desc: shareDesc, // 分享描述
                imgUrl: shareHeader, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });
        }
    });
}

function tipsNoFace() {
    $("#head_img").attr({
        "src": headUrl + headImg[headRandom][1]
    });
    imgTip.hide();
    $(".pic_header_name").html(headImg[headRandom][0]);
    $(".pic_text").html(tipsInfo.noFace[tipsRandom]);
}

function tips(sex) {
    var d = sourceImg.width / showImg.width(),
        x = (box.width() - showImg.width()) / 2,
        y = (box.height() - showImg.height()) / 2;
    // console.log(d);
    tipsCon(sex);
    imgTip.show().width(imgFace.w / d).height(imgFace.h / d).css({
        top: imgFace.y / d + y - 1,
        left: imgFace.x / d - 1
    });
    if (imgFace.y / d < 50) {
        imgTip.find(".tips").removeClass("tips_top").addClass("tips_bottom");
    };
    var tipsConText = imgTip.find(".tips");
    if (box.width() - imgFace.x / d + 10 < tipsConText.width()) {
        tipsConText.css({
            left: -(tipsConText.width() - imgFace.w / d)
        });
        tipsConText.find(".arrow").css({
            left: tipsConText.width() - imgFace.w / d / 2
        });
    }
    if (sex == "Male") {
        face = 1;
    } else if (sex == "Female") {
        face = 2;
    };
}

function tipsCon(sex) {
    // header
    $("#head_img").attr({
        "src": headUrl + headImg[headRandom][1]
    });
    $(".pic_header_name").html(headImg[headRandom][0]);
    // tips
    $(".tips .tips_con").html(tipsInfo[sex][tipsRandom][0]);
    $(".pic_text").html(tipsInfo[sex][tipsRandom][1]);
}

function imgLoad(url, callback) {
    var img = new Image();
    img.src = url;
    if (img.complete) {
        sourceImg.width = img.width;
        sourceImg.height = img.height;
        imgWH(showImg, sourceImg, box);
        callback();
    } else {
        img.onload = function() {
            sourceImg.width = img.width;
            sourceImg.height = img.height;
            imgWH(showImg, sourceImg, box);
            img.onload = null;
            callback();
        };
    };
};
// 图片等比自适应
function imgWH(showImg, sourceImg, box) {
    var d = sourceImg.width / sourceImg.height;
    var w = box.width() / box.height();
    // console.log(sourceImg.width, sourceImg.height);
    if (d > w) {
        showImg.width(box.width());
        showImg.height(box.width() / d);
    } else {
        showImg.height(box.height());
        showImg.width(d * box.height());
    }
}

function random(num) {
    return Math.floor(Math.random() * num);
}

function locationUrl() {
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?");
    return str.substr(0, num);
}
var ua = navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == "micromessenger") {
    $.getScript("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function() {
        $.ajax({
            url: "http://wx.h5dev.cn/jssdk/",
            type: "GET",
            dataType: "jsonp",
            jsonpCallback: "handler",
            data: {
                'url': window.location.href
            },
            success: function(data) {
                //alert(data);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature, // 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'previewImage', 'uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function() {
                    $(".test_btn").click(function() {
                        wx.chooseImage({
                            count: 1, // 默认9
                            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                            success: function(res) {
                                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                                wx.uploadImage({
                                    localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                                    isShowProgressTips: 1, // 默认为1，显示进度提示
                                    // 
                                    success: function(res) {
                                        var serverId = res.serverId; // 返回图片的服务器端ID
                                        $.ajax({
                                            url: "http://wx.hiapk.com/index.php",
                                            type: "GET",
                                            dataType: "json",
                                            data: "r=downmedia&appid=1&media_id=" + serverId,
                                            success: function(msg) {
                                                // alert(msg.imgurl);
                                                uploadBackcall(msg.imgurl);
                                            }
                                        })
                                    }
                                });
                            }
                        });
                    });
                });
            }
        });
    });
} else {
    // return false; // alert("nwx")
}