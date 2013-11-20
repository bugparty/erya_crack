/* http://heuet.tsk.erya100.com/flash/videoplay/flash_main.js?t=201204060226 *.\/
/** 校园网流畅视频地址 */
var xiaoL;
/** 公园网流畅视频地址 */
var gongL;
/** 默认播放的视频 */
var defaultPlay;
/** 字幕字符串 */
var subtitle;
/** 加载时间起始指针 */
var startTime;
/** 是否向后台(java)发送请求: 0不发送；1发送 */
var isSend;
/** 交互地址 */
var sendURL;
/** 交互时间间隔(秒) */
var timeLength = 120;
/** 是否允许用户拖动: 0不允许，1允许  */
var canDrag;
/** 是否允许打开小窗口: 0不允许，1允许  */
var canOpenWin = 1;
/** 是否为小窗口: 0不是，1是  */
var isSmallWin = 0;
/** 本课程有几个课后作业 */
var zuoyeNum = 1;
/** 作业地址 */
var zuoyeURL ;
/** 作业地址打开方式:"_self" 指定当前窗口中的当前帧,"_blank" 指定一个新窗口,"_parent" 指定当前帧的父级,"_top" 指定当前窗口中的顶级帧 */
var zuoyeWindow = "_blank";
/** 是否有下一集: 0不是，1是  */
var hasNextVideo = 1;
/** 切换失败时的提示 */
var qieTip = "温馨提示：校园网未部署视频，不支持切换！";
/** flash地址 */
var flashSrcURL="flashplayer3.9";
/** 播放器类型:"tsk","ysk","2class","tsk_temp" */
var playType = "tsk";
/** 是否首页QPic外加载swf */
var isLoadQPicSWF = 0;
/** 首页QPic外加载swf地址 */
var loadQPicSWFURL = "";
/** 是否暂停剪辑外加载swf */
var isLoadPIPanSWF = 0;
/** 暂停剪辑外加载swf地址 */
var loadPIPanSWFURL = "";
/** 每次加载多少秒(分段加载的分段时长:秒) */
var loadTimeSecond = 300;
/** 是否登录*/
var isLogin='0';

/**** 参数组合 ****/
/*************************************************************
 * 				发布视频
 * ***********************************************************/
/**
 * 发布视频--js调用
 * @param  xiaoL 校园网视频地址
 * @param  gongL 公网视频地址
 * @param  _subtitle 字幕字符串
 * @param  _isSend 是否向后台(java)发送请求: 0不发送；1发送
 * @param  _sendURL 交互地址
 * @param  _canDrag 是否允许用户拖动: 0不允许，1允许
 * @param  _hasNextVideo 是否有下一集: 0不是，1是
 * @param  _nextVideoUrl 下一集地址
 * @param  _isLogin 是否登录(是则显示作业/下一集面板)
 */
function publishVideo(_xiaoL,_gongL,_subtitleG,_subtitleX,
                 _isSend,_sendURL,_canDrag,
                 _hasNextVideo,_nextVideoUrl,
                 _startTime,
				 _zuoyeNum, _zuoyeURL,
				 _curVideo
){	
	thisMovie("flashplayer").flash_publish(_xiaoL,_gongL,_subtitleG,_subtitleG,
                 _isSend,_sendURL,1,
                 _hasNextVideo,_nextVideoUrl,
                 _startTime,
				 _zuoyeNum, _zuoyeURL,
				 _curVideo //切换的集数
                );
	//alert(_subtitleX+"===="+_subtitleG);
}

/**
 * 向flash注入参数
 * @param {Object} xiaoL 校园网流畅视频地址
 * @param {Object} gongL 公园网流畅视频地址
 * @param {Object} defaultPlay 默认播放的视频(4个可选值："xiaoL","xiaoH","gongH","gongL")
 * @param {Object} subtitle 字幕字符串
 * @param {Object} startTime 加载时间起始指针
 * @param {Object} isSend 是否向后台(java)发送请求: 0不发送；1发送
 * @param {Object} sendURL 交互地址
 * @param {Object} canDrag 是否允许用户拖动: 0不允许，1允许
 * @param {Object} zuoyeNum 本课程有几个课后作业
 * @param {Object} hasNextVideo 是否有下一集: 0不是，1是
 * @param {Object} _nextVideoUrl 下一集按钮所打开的页面地址
 * @param {Object} _isLogin 是否登录了(是否显示做作业面板)
 */
function writeFlash(_xiaoL,_gongL,_defaultPlay,
                   _subtitleX,_subtitleG,_startTime,_isSend,_sendURL,_canDrag,
                    _zuoyeNum,_zuoyeURL,
                    _hasNextVideo,_nextVideoUrl,
                    _isLogin)
{
	xiaoL = _xiaoL;
	gongL = _gongL;
	defaultPlay = _defaultPlay;
	subtitleX = _subtitleG;
	subtitleG = _subtitleG;
	startTime = _startTime;
	isSend = _isSend;
	sendURL = _sendURL;
	canDrag = 1;  //Forse to Drag
	zuoyeNum= _zuoyeNum;
	zuoyeURL = _zuoyeURL;
	/**** 组合参数 ****/
	var FlashVars = 'xiaoL='+xiaoL
		+'&&gongL='+gongL+'&&defaultPlay='+defaultPlay
		+'&&subtitleX='+subtitleX+'&&subtitleG='+subtitleG
		+'&&startTime='+startTime
		+'&&isSend='+isSend+'&&sendURL='+sendURL+'&&timeLength='+timeLength
		+'&&canDrag='+canDrag+'&&canOpenWin='+canOpenWin
		+'&&isSmallWin='+isSmallWin
		+'&&zuoyeNum='+zuoyeNum+'&&zuoyeURL='+zuoyeURL+'&&zuoyeWindow='+zuoyeWindow
		+'&&hasNextVideo='+_hasNextVideo+'&&nextVideoUrl='+_nextVideoUrl
		+'&&isLogin='+_isLogin+'&&playType='+playType
		+'&&isLoadQPicSWF='+isLoadQPicSWF+'&&loadQPicSWFURL='+loadQPicSWFURL
		+'&&isLoadPIPanSWF='+isLoadPIPanSWF+'&&loadPIPanSWFURL='+loadPIPanSWFURL
		+'&&loadTimeSecond='+loadTimeSecond
		;
	console.log("FlashVars is "+ FlashVars);

	/**** 注入插件 ****/
	if (AC_FL_RunContent == 0) {
		alert("此页需要 AC_RunActiveContent.js");
	} else {
		AC_FL_RunContent(
			'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0',
			'width', '772',
			'height', '510',
			'src', "flashplayer",
			'quality', 'high',
			'pluginspage', 'http://www.macromedia.com/go/getflashplayer',
			'align', 'middle',
			'play', 'true',
			'loop', 'true',
			'scale', 'showall',
			'wmode', 'window',
			'devicefont', 'false',
			'id', 'flashplayer',
			'bgcolor', '#000000',
			'name', 'flashplayer',
			'menu', 'true',
			'allowFullScreen', 'true',
			'allowScriptAccess','sameDomain',
			'movie', '/flash/videoplay/'+flashSrcURL,
			'salign', '',
			'FlashVars',FlashVars
			); //end AC code
	}
}
/**
 * 开/关灯(由flash触发)
 * @param {Object} flag 0为关灯,1为开灯
 */
function openLight(flag){
	if(flag == 0){
		//alert('执行关灯行为');
		convertLight();
	}else{
		//alert('执行开灯行为');
		convertLight();
	}
}

var w;
var proTime,videoURLName;
/**
 * 打开小窗口(由flash触发)
 */
function openSmallWin(_proTime,_videoURLName){
	proTime = _proTime;
	videoURLName = _videoURLName;
	FlashVars = '&&defaultPlay='+videoURLName
		+'&&startTime='+proTime;
	w = window.open ('/flash/videoplay/tan.html', '', 'height=540, width=855, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
}

/**
 * 被子窗口调用，回复播放
 * @param {Object} proTime
 * @param {Object} videoURLName
 * @param {Object} hasOver 是否播放完毕:0否;1是
 */
function resumeVideo(proTime,videoURLName,hasOver){
	thisMovie('flashplayer').flash_resumePlay(proTime,videoURLName,hasOver);
}

/**
 * 取出flash对象
 * @param {Object} movieName
 */
function thisMovie(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[movieName];
	}
	else{
		return document[movieName];
	}
}

/*****************************************
 *           播放暂停控制
 *****************************************/
/** 对视频操作前视频的播放状态 */
var isplaying;
/**
 * 恢复播放(js调用flash)
 * @return
 */
function play() {
	if(isplaying){
		thisMovie("flashplayer")["flash_resume"]();
	}
}

/**
 * 暂停(js调用flash)
 * @return
 */
function pause() {
    isplaying = thisMovie("flashplayer")["flash_pause"]();
}

/**
 * 下一集(由flash触发)
 */
function nextVBtnClickHandle(url){
	window.location = $("#currli + .featureBox > .zcblks1 > a").eq(0).attr("url") ; 
}

/**
 * 做作业(由flash触发)
 */
function zuoYeBtnClickHandle(url){
	window.open(url, '作业详细页', '') ;
}
/**
 * 开/关灯
 * @memberOf {TypeName} 
 */
function convertLight(){
   $("#shadow").toggle();
    if ($("#shadow").is(":hidden")){
		 $(this).removeClass("turnedOff");
	} 
    else{
		 $(this).addClass("turnedOff");
	}  
}

/**
 * 读取完毕执行
 */
$(document).ready(function(){
    $("#shadow").css("height", $(document).height()).hide();
}); 

function unlock()
{
	if(isLogin=='0'||isLogin==0)return ;
	var o=$("#currli + .featureBox > .zcblks1 > a");
	if(o&&o.eq(0)){
		o.children(".lock").remove();
		o.attr("href",o.attr("url"));
	}
}
