import { _decorator, Component, Label, Button, Node } from 'cc';
import { TelegramWebApp, WebAppInitData } from '../cocos-telegram-miniapps/scripts/telegram-web';
import { TonConnectUI, Address } from '@ton/cocos-sdk';
import { HttpClient } from './HttpClient';

const { ccclass, property } = _decorator;

interface ResponseUser {
    status: string;
    message?: string;
    user?: User;
}

interface ResponseProtected {
    message?: string;
    user?: User;
}

interface User {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    photo_url: string;
    auth_date: string;
    token: string;
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
    connectLbl: Label = null;

    @property(Label)
    initDataLbl: Label = null;

    protected connectUI: TonConnectUI = null;

    private _base_url: string = "https://alpha.audiera.fi:5000/api/";
    private _tg_auth_url: string = "/auth/telegram"

    protected onLoad() {
        console.info("onLoad");
        this.initTonConnect();
        //获取Telegram用户信息，用于小游戏登录，使用user id作为登录的唯一id
        TelegramWebApp.Instance.init().then(res => {
            console.info("telegram web app init : ", res.success);
            var webAppInitData = TelegramWebApp.Instance.getTelegramWebAppInitData();
            console.info(webAppInitData);
            console.info(webAppInitData.user);
            if (webAppInitData && webAppInitData.user) {
                this.idLbl.string = "Id: " + webAppInitData.user.id; //telegram用户唯一id，可以用于tg小游戏登录
                this.nameLbl.string = "UserName: " + webAppInitData.user.username;
            }

            this.initDataLbl.string = "Init Data: " + TelegramWebApp.Instance.getTelegramInitData();
            //this.tgLogin(TelegramWebApp.Instance.getTelegramInitData());
        });
    }

    start() {

    }

    update(deltaTime: number) {

    }

    public onConnect() {
        if (this.isConnected()) {
            this.connectUI.disconnect();
        } else {
            this.connectUI.openModal();
        }
    }

    //Telegram小游戏分享
    public onShare() {
        console.info("share ");
        TelegramWebApp.Instance.share("https://t.me/MyTestGame029Bot/TgTest", "Invite you to play a very interesting game");
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
        this.updateConnect();
    }

    private isConnected(): boolean {
        if (!this.connectUI) {
            console.error("ton ui not inited!");
            return false;
        }
        return this.connectUI.connected;
    }

    // Get the wallet address after successful connection
    private updateConnect() {
        if (this.isConnected()) {
            const address = this.connectUI.account.address; //用户连接的钱包地址
            this.addressLbl.string = "Address: " + Address.parseRaw(address).toString({ testOnly: false, bounceable: false });
            this.connectLbl.string = "Connected";
        } else {
            this.connectLbl.string = "Connect";
            this.addressLbl.string = "Address: ";
        }
    }

    private async tgTestLogin() {
        //for test telegram 授权登录接口
        try {
            /*const data = new URLSearchParams();
            data.append('id', '1');
            data.append('first_name', 'daniel');
            data.append('last_name', 'liu');
            data.append('username', 'daniel_liu029');
            console.info(data.toString());
            console.info(encodeURIComponent(data.toString()));*/
            var data = 'user=' + encodeURIComponent('{"id":1,"first_name":"daniel","last_name":"liu","username":"daniel_liu029"}') + '&auth_date=1&hash=2&signature=3';
            console.info(data);

            var response = await HttpClient.post<ResponseUser>(this._base_url, this._tg_auth_url, "application/x-www-form-urlencoded", data);
            console.info(response.user.token);

            var response2 = await HttpClient.get<ResponseProtected>(this._base_url, "/protected", "application/json", null, response.user.token);
            console.info(response2.message);
        } catch(error) {
            console.error(error);
        }
        // 
    }

    private async tgLogin(initData:string) {
        try {
            var response = await HttpClient.post<ResponseUser>(this._base_url, this._tg_auth_url, "application/x-www-form-urlencoded", initData);
            console.info(response.user.token);
            this.initDataLbl.string = "token: " + response.user.token;

            var response2 = await HttpClient.get<ResponseProtected>(this._base_url, "/protected", "application/json", null, response.user.token);
            console.info(response2.message);
        } catch(error) {
            console.error(error);
        }
    }
    
}

