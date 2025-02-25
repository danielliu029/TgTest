import { _decorator, Component, Label, Button, Node } from 'cc';
import { TelegramWebApp, WebAppInitData } from '../cocos-telegram-miniapps/scripts/telegram-web';
import { TonConnectUI, Address } from '@ton/cocos-sdk';

const { ccclass, property } = _decorator;

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

    protected connectUI: TonConnectUI = null;
    private _webAppInitData: WebAppInitData = null;

    protected onLoad() {
        console.info("onLoad");
        this.initTonConnect();
        //获取Telegram用户信息，用于小游戏登录，使用user id作为登录的唯一id
        TelegramWebApp.Instance.init().then(res => {
            console.info("telegram web app init : ", res.success);
            this._webAppInitData = TelegramWebApp.Instance.getTelegramWebAppInitData();
            console.info(this._webAppInitData);
            console.info(this._webAppInitData.user);
            if (this._webAppInitData && this._webAppInitData.user) {
                this.idLbl.string = "Id: " + this._webAppInitData.user.id; //telegram用户唯一id，可以用于tg小游戏登录
                this.nameLbl.string = "UserName: " + this._webAppInitData.user.username;
            } 
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
    
}

