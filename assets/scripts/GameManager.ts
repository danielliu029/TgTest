import { _decorator, Component, Label, Button, Node, randomRangeInt } from 'cc';
import { TelegramWebApp, WebAppInitData } from '../cocos-telegram-miniapps/scripts/telegram-web';
import { TonConnectUI, Address } from '@ton/cocos-sdk';
import { HttpClient } from './HttpClient';
import { CHAIN } from '@tonconnect/sdk'

const { ccclass, property } = _decorator;

interface ResponseLogin {
    status: string;
    user?: User;
    token?: string; //授权token
    message?: string;
    code?: number;
}


interface User {
    tg_id: number; //telegram 用户唯一id
    username: string; 
    first_name: string;
    last_name: string;
    photo_url: string;
    ton_wallet: string;
    points: number;  //用户游戏累积积分
    referral_tg_id: number; //推荐者tg id
    acc_referral_points: number;  //累积推荐所获得的积分奖励
    acc_referral_number: number;  //累积推荐的人数
    last_interaction: number; //最后一次交互时间
    first_dance_time: number; //每日第一次跳舞游戏时间
    danced_count: number; //每日累积的跳舞次数，utc 0点清零
    reward_dance_count: number; //奖励的跳舞次数，utc 0点清零
    max_dance_count: number; //每日最大跳舞次数，utc 0点重新计算
}

interface DanceInfo {
    tg_id: number; //telegram 用户唯一id
    points: number;  //用户游戏累积积分
    danced_count: number; //每日累积的跳舞次数，utc 0点清零
    reward_dance_count: number; //奖励的跳舞次数，utc 0点清零
    max_dance_count: number; //每日最大跳舞次数，utc 0点重新计算
}

interface ResponseBindWallet {
    status: string;
    wallet?: string;
    message?: string;
    code?: number;
}

interface ResponseUnBindWallet {
    status: string;
    message?: string;
    code?: number;
}

interface ResponseDanceEnd {
    status: string;
    info?: DanceInfo;
    message?: string;
    code?: number;
}

interface OrderInfo {
    order_id: string,
    pid: number,
    payment_address: string,
    price: number,
    type: number,
    value: number,
    network: number,
    payload: string
}

interface ResponseCreateOrder {
    status: string;
    info?: OrderInfo;
    message?: string;
    code?: number;
}

interface ResponseCancelOrder {
    status: string;
    order_id?: string;
    message?: string;
    code?: number;
}

interface OrderInfo2 {
    tg_id: number,
    order_id: string,
    pid: number,
    price: number,
    type: number,
    value: number,
    status: number,
    trans_hash: string,
    ton_wallet: string,
    create_time: number
}

interface ResponseGetOrder {
    status: string;
    order?: OrderInfo2;
    message?: string;
    code?: number;
}

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Label)
    idLbl: Label = null;

    @property(Label)
    nameLbl: Label = null;

    @property(Label)
    addressLbl: Label = null;

    @property(Label)
    pointsLbl: Label = null;

    @property(Label)
    connectLbl: Label = null;

    @property(Label)
    debugInfo: Label = null;

    @property(Label)
    payResult: Label = null;

    @property(Button)
    connectButton: Button = null;

    @property(Button)
    danceEndButton: Button = null;

    protected connectUI: TonConnectUI = null;


    private static _local_host: boolean = false;
    private static _test_login: boolean = false;
    private _base_url: string = GameManager._local_host ? "http://127.0.0.1:5000" : "https://tgdev.neubeat.fi";
    private _login_path: string = "/api/auth/telegram"; //登录接口
    private _test_login_path: string = "/api/test/telegram"; //测试无需验证登录接口
    private _bind_ton_wallet_path: string = "/api/bindTonWallet"; //绑定ton 钱包接口
    private _unbind_ton_wallet_path: string = "/api/unbindTonWallet"; //解绑ton 钱包接口
    private _dance_end_path: string = "/api/danceEnd"; //跳舞结束统计积分接口
    private _create_order_path: string = "/api/createOrder"; //创建支付订单接口
    private _get_order_path: string = "/api/getOrder"; //获取订单接口
    private _user: User = null;
    private _token: string = "";
    private _order_id: string = "";

    protected onLoad() {
        console.info("onLoad");
        if (GameManager._test_login) {
            this.testLogin();
            this.connectButton.enabled = false;
        } else {
            this.connectButton.enabled = true;
            this.initTonConnect();
            //获取Telegram用户信息，用于小游戏登录，使用user id作为登录的唯一id
            TelegramWebApp.Instance.init().then(res => {
                console.info("telegram web app init : ", res.success);
                console.info("Init Data: " + decodeURIComponent(TelegramWebApp.Instance.getTelegramInitData()));
                this.tgLogin(TelegramWebApp.Instance.getTelegramInitData());
            });   
        }
    }

    start() {

    }

    update(deltaTime: number) {

    }

    private async test() {
        try {
            console.log("test start");
            const path = "https://t.me/i/userpic/320/D0GITmcz1OqlW5RL3Ta64KKzEoIaPY3kGdGN4cCRf1U.svg";
            const url = new URL(path);
            const response = await fetch(url, {
                // 必须显式允许跨域（如果目标域名不同）
                mode: 'cors'
              });
            console.log(response);

        } catch (error) {
            console.error('网络请求错误:', error);

            throw error;
        }
    }

    public onConnect() {
        if (this.isConnected()) {
            this.doDisconnect();
        } else {
            this.connectUI.openModal();
        }
    }

    public onDanceEnd() {
        //for test
        this.danceEnd(200);
        //--
    }

    public onPayTest() {
        this.payTest(4);
    }

    //Telegram小游戏分享
    public onShare() {
        console.info("share ");
        TelegramWebApp.Instance.share("https://t.me/MyTestGame029Bot/TgTest?start=invite_" + this._user.tg_id, "Invite you to play a very interesting game");
    }

    //初始化ton connect ui
    private initTonConnect() {
        this.connectUI = new TonConnectUI({
            manifestUrl: 'https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json'
        });
      

        // Listen for connection status changes
        this.connectUI.onModalStateChange(state => {
            console.log("model state changed! : ", state);
            this.updateConnect();
        });

        // Listen for wallet status changes
        this.connectUI.onStatusChange(info => {
            console.log("wallet info status changed : ", info);
            this.updateConnect();
        });
    }

    private isConnected(): boolean {
        if (!this.connectUI) {
            console.error("ton ui not inited!");
            return false;
        }

        return this.connectUI.connected;
    }

    private async doDisconnect() {
        if (this.connectUI.connected) {
            this.connectUI.disconnect();
        } else {
            this._user.ton_wallet = "";
            this.addressLbl.string = "Address: ";
            this.connectLbl.string = "Connect";
        }
    }

    // Get the wallet address after successful connection
    private async updateConnect() {
        if (this.isConnected()) {
            //用户连接的钱包地址
            var strAddress: string = Address.parseRaw(this.connectUI.account.address).toString({ testOnly: false, bounceable: false });
            this._user.ton_wallet =  strAddress;
            this.addressLbl.string = "Address: " + this._user.ton_wallet;
            this.connectLbl.string = "Connected";
        } else {
            this._user.ton_wallet = "";
            this.addressLbl.string = "Address: ";
            this.connectLbl.string = "Connect";
        }
    }

    private setUserInfo(response: ResponseLogin) {
        this._user = response.user;
        this._token = response.token;
        this.idLbl.string = "id: " + this._user.tg_id.toString();
        //优先显示username
        if (this._user.username != "") {
            this.nameLbl.string = "name: " + this._user.username;
        } else {
            this.nameLbl.string = "name: " + this._user.first_name + " " + this._user.last_name;
        }
        
        this.addressLbl.string = "Address: " + this._user.ton_wallet;
        this.connectLbl.string = this.isConnected() ? "Connected" : "Connect";
        this.pointsLbl.string = "Points: " + this._user.points.toString();
    }

    //以下接口请求
    //test登录接口, 无需授权
    private async testLogin() {
        try {
            var data = 'user=' + encodeURIComponent('{"id":1,"first_name":"yingbin","last_name":"liu","username":"daniel029"}') + '&auth_date=1&hash=2&signature=3';
            console.info(data);

            var response = await HttpClient.post<ResponseLogin>(this._base_url, this._test_login_path, "application/x-www-form-urlencoded", data);
            this.setUserInfo(response);
            this.debugInfo.string = "";
        } catch(error) {
            console.error(error);
        }
    }

    //正式的telegram小游戏授权登录接口
    private async tgLogin(initData:string) {
        try {
            console.info("tg login: ", initData);
            var response = await HttpClient.post<ResponseLogin>(this._base_url, this._login_path, "application/x-www-form-urlencoded", initData);
            this.setUserInfo(response);
            this.debugInfo.string = "";
        } catch(error) {
            console.error(error);
            this.debugInfo.string = "error: " + error.toString();
        }
    }

    //绑定钱包接口
    private async bindTonWallet(wallet:string) {
        try {
            if (this._token == "") {
                return "";
            }

            console.info("bindWallet: ", wallet);
            var dic = {
                "wallet": wallet
            }
            var response = await HttpClient.post<ResponseBindWallet>(this._base_url, this._bind_ton_wallet_path, "application/json", dic, this._token);
            this.debugInfo.string = "";
            return response.wallet;

        } catch(error) {
            console.error(error);
            this.debugInfo.string = "error: " + error.toString();
        }
    }

    //取消绑定接口
    private async unbindWallet() {
        try {
            if (this._token == "") {
                return;
            }
            console.info("unBindWallet");
            await HttpClient.post<ResponseUnBindWallet>(this._base_url, this._unbind_ton_wallet_path, "application/json", {}, this._token);
            this.debugInfo.string = "";
        } catch(error) {
            console.error(error);
            this.debugInfo.string = "error: " + error.toString();
        }
    }

    //跳舞接受后积分统计接口
    private async danceEnd(addPoints: number) {
        try {
            if (this._token == "") {
                return 0;
            }

            console.info("danceEnd: ", addPoints);
            var dic = {
                "points": addPoints
            }
            var response = await HttpClient.post<ResponseDanceEnd>(this._base_url, this._dance_end_path, "application/json", dic, this._token);
            this._user.points = response.info.points;
            this.pointsLbl.string = "Points: " + this._user.points.toString();
            this.debugInfo.string = "";
        } catch(error) {
            console.error(error);
            this.debugInfo.string = "error: " + error.toString();
        }
    }

    //支付接口
    private async payTest(pid:number) {
        if (this.isConnected() == false) {
            //没有链接ton钱包，先链接，然后再支付
            this.connectUI.openModal();
            return;
        }

        var wallet = Address.parseRaw(this.connectUI.account.address).toString({ testOnly: false, bounceable: false });

        // 调用接口创建订单，获取order id
        var dic = {
            "wallet": wallet,
            "pid": pid
        }
        var response = await HttpClient.post<ResponseCreateOrder>(this._base_url, this._create_order_path, "application/json", dic, this._token);
        console.info(response);

        if (response.info && response.info.order_id != "") {
            const transaction = {
                validUntil: Math.floor(Date.now() / 1000) + 600, //支付超时时间设置成10分钟
                network: response.info.network == 1 ? CHAIN.MAINNET : CHAIN.TESTNET, //支付网络
                messages: [
                    {
                        address: response.info.payment_address, //支付的目的地址
                        amount: response.info.price.toString(), //支付金额
                        payload: response.info.payload // payload with comment in body
                    }
                ]
            };
            
            const result = await this.connectUI.sendTransaction(transaction);
            if (result && result.boc != "") {
                this.payResult.string = "boc: " + result.boc;
                console.log(result.boc);
                this.loopGetOrder(response.info.order_id)
            } else {
                this.payResult.string = "Pay Result: " + response.info.order_id + " 交易取消";
            }
        }
    }

    private loopGetOrder(order_id:string) {
        this._order_id = order_id;
        //间隔10s获取支付信息，最多循环6次，延迟10s执行
        this.schedule(this.getOrderCallback, 10, 6, 10);
    }

    getOrderCallback() {
        console.log("order id: ", this._order_id);
        this.getOrder(this._order_id);
    }

    private async getOrder(order_id:string) {
        var response = await HttpClient.get<ResponseGetOrder>(this._base_url, this._get_order_path, "", {"order_id": order_id}, this._token);
        console.info(response);
        if (response.order) {
            if (response.order.status == 0) {
                //未支付
                this.payResult.string = "Pay Result: " + order_id + " 未支付";
            } else if (response.order.status == 1) {
                //支付成功
                this.payResult.string = "Pay Result: " + order_id + " 支付成功";
                this.unschedule(this.getOrderCallback);
            } else if (response.order.status == 2) {
                //支付失败
                this.payResult.string = "Pay Result: " + order_id + " 支付失败";
                this.unschedule(this.getOrderCallback);
            } else {
                //取消支付
                this.payResult.string = "Pay Result: " + order_id + " 取消支付";
                this.unschedule(this.getOrderCallback);
            }
        }
    }
}

