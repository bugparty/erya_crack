package com.erya100.java
{
    import com.erya100.util.*;
    import flash.events.*;
    import flash.net.*;
    import flash.utils.*;

    public class SendJava extends Object
    {
        private var sendURL_DL:String;
        private var timer:Timer;
        public var isSendOver:Boolean = false;
        private var sendURL:String;
        private var timeLength:int = 5;
        private var urlRequest:URLRequest;
        private var yin:Object;
        private var conMaxTime:int = 0;
        private var _isSend:Boolean = false;
        private var variables:URLVariables;
        private var reSendTimer:Timer;

        public function SendJava(param1:Object)
        {
            this.yin = param1;
            return;
        }// end function

        public function setConfig(param1:Boolean, param2:String, param3:int = 5) : void
        {
            this.isSend = param1;
            this.sendURL = param2;
            this.timeLength = param3;
            this.sendStartParam();
            return;
        }// end function

        private function reSendTimerCompleteHandle(event:TimerEvent) : void
        {
            this.reSendTimer.removeEventListener(TimerEvent.TIMER_COMPLETE, this.reSendTimerCompleteHandle);
            this.sendToJava();
            return;
        }// end function

        private function ioErrorHandle(event:IOErrorEvent) : void
        {
            this.yin.showTipText(1);
            this.showSendMessPan(true);
            return;
        }// end function

        public function get isSend() : Boolean
        {
            return this._isSend;
        }// end function

        public function set isSend(param1:Boolean) : void
        {
            this._isSend = param1;
            return;
        }// end function

        private function sendToJava() : void
        {
            if (!this.isSend)
            {
                return;
            }
            this.variables = new URLVariables();
            this.urlRequest = new URLRequest(this.sendURL_DL);
            this.urlRequest.data = this.variables;
            this.urlRequest.method = URLRequestMethod.POST;
            var _loc_1:* = new URLLoader();
            _loc_1.load(this.urlRequest);
            _loc_1.addEventListener(Event.COMPLETE, this.loaderComHandle);
            _loc_1.addEventListener(IOErrorEvent.IO_ERROR, this.ioErrorHandle);
            _loc_1.addEventListener(SecurityErrorEvent.SECURITY_ERROR, this.securityErrorHandle);
            return;
        }// end function

        private function showSendMessPan(param1:Boolean) : void
        {
            if (this.yin && this.yin["showSendMessPan"] && this.isSendOver)
            {
                var _loc_2:* = this.yin;
                _loc_2.this.yin["showSendMessPan"](param1);
            }
            return;
        }// end function

        public function stopSend(param1:Boolean = false) : void
        {
            if (!this.isSend)
            {
                return;
            }
            if (param1 || !this.isSendOver)
            {
                this.isSendOver = true;
                this.addSendParams(Math.floor(this.yin.movieTotalTime), 2);
                this.sendToJava();
            }
            return;
        }// end function

        private function securityErrorHandle(event:SecurityErrorEvent) : void
        {
            this.yin.showTipText(2);
            return;
        }// end function

        public function checkProTime(param1:Number) : void
        {
            var _loc_2:* = Math.floor(param1);
            if (this.conMaxTime != _loc_2 && _loc_2 % Math.floor(this.timeLength) == 0)
            {
                this.conMaxTime = _loc_2;
                this.sendToJava();
            }
            return;
        }// end function

        public function sendStartParam() : void
        {
            this.addSendParams(0, 1);
            this.sendToJava();
            return;
        }// end function

        private function loaderComHandle(event:Event) : void
        {
            var _loc_2:* = String(event.target.data);
            switch(_loc_2)
            {
                case "1":
                {
                    this.yin.hideTipText();
                    this.showSendMessPan(false);
                    break;
                }
                case "2":
                {
                    this.yin.showTipText(1);
                    this.showSendMessPan(true);
                    break;
                }
                case "3":
                {
                    this.yin.showTipText(1);
                    this.showSendMessPan(true);
                    break;
                }
                default:
                {
                    break;
                    break;
                }
            }
            return;
        }// end function

        public function addSendParams(param1:Number, param2:Number) : void
        {
            this.sendURL_DL = this.sendURL;
            if (this.sendURL.indexOf("?") < 0)
            {
                this.sendURL_DL = this.sendURL_DL + "?";
            }
            else
            {
                this.sendURL_DL = this.sendURL_DL + "&";
            }
            var _loc_3:String = "";
            _loc_3 = _loc_3 + Math.round(param1);
            _loc_3 = _loc_3 + ("&" + Math.round(param2));
            var _loc_4:* = new Date();
            _loc_3 = _loc_3 + ("&" + _loc_4.getTime());
            this.sendURL_DL = this.sendURL_DL + ("rand=" + Base64.encode(_loc_3));
            return;
        }// end function

    }
}
