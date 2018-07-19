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
    pageUrl: "http://wx.hiapk.com/events/2015ccsqk/",
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
 * 类似http://xxx/index.htm?uploadImgUrl=images/pic.jpg&imgFaceX=211&imgFaceW=56&imgFaceY=145&imgFaceH=56&headRandom=4&tipsRandom=0&face=2
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
    }
}
// 图片提交，回调函数
function uploadCallback(imgUrl) {
    if (imgUrl) {
        uploadImgUrl = imgUrl;
    };

    showImg.attr("src", uploadImgUrl);

    imgLoad(uploadImgUrl);
    var imgFile = uploadImgUrl.replace(/data:image\/jpeg;base64,/, '');
    $.ajax({
        url: 'https://api.eyekey.com/face/Check/checking',
        type: "POST",
        data: {
          'app_id': 'c2e0031b3b144b2a93b43841d27a9e6b',
          'app_key': 'd4ac82905fad48e3b8b01fd5cc0117d1',
          // 'url': $("url_test").value,
          'img': imgFile,
          'mode': "",
          'tip': ""
        },
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
            // console.log(shareLink);
        },

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
        if(callback){
          callback();
        }
    } else {
        img.onload = function() {
            sourceImg.width = img.width;
            sourceImg.height = img.height;
            imgWH(showImg, sourceImg, box);
            img.onload = null;
            if(callback){
              callback();
            }
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
$(".test_btn").click(function() {
  checkFace();
});

function checkFace(){
  if(!$("#File").length){
    $("body").append(`<input id='File' style='display:none;' type='file' />`);
  }
  $("#File").click();
  $("#File").change(() => {
    let reader = new FileReader();
    let file = $("#File").prop('files')[0];
    // 以base64读取图片
    reader.readAsDataURL(file);
    reader.onload = () => {
      // console.log(reader.result)
      uploadCallback(reader.result);
    };
  });
}