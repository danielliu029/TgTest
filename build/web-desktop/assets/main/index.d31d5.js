System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './telegram-web.ts', './index.ts', './HttpClient.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Label, _decorator, Component, TelegramWebApp, __webpack_exports__TonConnectUI, __webpack_exports__Address, HttpClient;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      TelegramWebApp = module.TelegramWebApp;
    }, function (module) {
      __webpack_exports__TonConnectUI = module.TonConnectUI;
      __webpack_exports__Address = module.Address;
    }, function (module) {
      HttpClient = module.HttpClient;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "117edbO4YZJoriXQWLvebhl", "GameManager", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec(_class = (_class2 = class GameManager extends Component {
        constructor() {
          super(...arguments);
          _initializerDefineProperty(this, "idLbl", _descriptor, this);
          _initializerDefineProperty(this, "nameLbl", _descriptor2, this);
          _initializerDefineProperty(this, "addressLbl", _descriptor3, this);
          _initializerDefineProperty(this, "connectLbl", _descriptor4, this);
          _initializerDefineProperty(this, "initDataLbl", _descriptor5, this);
          this.connectUI = null;
          this._base_url = "http://127.0.0.1:5000";
          //"https://alpha.audiera.fi:5000/api/";
          this._tg_auth_url = "/auth/telegram";
        }
        onLoad() {
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
            console.info("Init Data: " + TelegramWebApp.Instance.getTelegramInitData());
          });
        }
        start() {}
        update(deltaTime) {}
        onConnect() {
          if (this.isConnected()) {
            this.connectUI.disconnect();
          } else {
            this.connectUI.openModal();
          }
        }

        //Telegram小游戏分享
        onShare() {
          console.info("share ");
          TelegramWebApp.Instance.share("https://t.me/MyTestGame029Bot/TgTest", "Invite you to play a very interesting game");
        }

        //初始化ton connect ui
        initTonConnect() {
          this.connectUI = new __webpack_exports__TonConnectUI({
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
        isConnected() {
          if (!this.connectUI) {
            console.error("ton ui not inited!");
            return false;
          }
          return this.connectUI.connected;
        }

        // Get the wallet address after successful connection
        updateConnect() {
          if (this.isConnected()) {
            const address = this.connectUI.account.address; //用户连接的钱包地址
            this.addressLbl.string = "Address: " + __webpack_exports__Address.parseRaw(address).toString({
              testOnly: false,
              bounceable: false
            });
            this.connectLbl.string = "Connected";
          } else {
            this.connectLbl.string = "Connect";
            this.addressLbl.string = "Address: ";
          }
        }
        async tgTestLogin() {
          //for test telegram 授权登录接口
          var data = {
            "id": "1",
            "first_name": "daniel",
            "last_name": "liu",
            "username": "daniel_liu029"
          };
          try {
            var response = await HttpClient.post(this._base_url, this._tg_auth_url, data);
            console.info(response.user.token);
            var response2 = await HttpClient.get(this._base_url, "/protected", null, response.user.token);
            console.info(response2.message);
          } catch (error) {
            console.error(error);
          }
          // 
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "idLbl", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nameLbl", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "addressLbl", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "connectLbl", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "initDataLbl", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HttpClient.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "22ff5UbR0NNAKksBaoUPD1t", "HttpClient", undefined);
      class HttpClient {
        /**
         * GET 请求
         */
        static async request(url, options) {
          try {
            const response = await fetch(url, options);
            if (!response.ok) {
              throw new Error(`请求失败: ${response.status} - ${response.statusText}`);
            }
            return await response.json();
          } catch (error) {
            console.error('网络请求错误:', error);
            throw error;
          }
        }

        // GET 请求
        static async get(baseUrl, path, params, authToken) {
          const url = new URL(path, baseUrl);
          if (params) {
            params.forEach(_ref => {
              let [key, value] = _ref;
              url.searchParams.append(key, value);
            });
          }
          var headers = {
            'Content-Type': 'application/json'
          };
          if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
          }
          return HttpClient.request(url, {
            method: 'GET',
            headers: headers
          });
        }

        // POST 请求
        static async post(baseUrl, path, data, authToken) {
          const url = new URL(path, baseUrl);
          var headers = {
            'Content-Type': 'application/json'
          };
          if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
          }
          return HttpClient.request(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
          });
        }
      }
      exports('HttpClient', HttpClient);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./telegram-web.ts', './GameManager.ts', './HttpClient.ts', './ResolutionAdjuster.ts'], function () {
  return {
    setters: [null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/ResolutionAdjuster.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, CCInteger, CCBoolean, _decorator, Component, View, ResolutionPolicy;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      CCInteger = module.CCInteger;
      CCBoolean = module.CCBoolean;
      _decorator = module._decorator;
      Component = module.Component;
      View = module.View;
      ResolutionPolicy = module.ResolutionPolicy;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "b7cf84Lo3lKQaTeZjg7KYPu", "ResolutionAdjuster", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let ResolutionAdjuster = exports('ResolutionAdjuster', (_dec = ccclass('ResolutionAdjuster'), _dec2 = property(CCInteger), _dec3 = property(CCInteger), _dec4 = property(CCInteger), _dec5 = property(CCInteger), _dec6 = property(CCBoolean), _dec(_class = (_class2 = class ResolutionAdjuster extends Component {
        constructor() {
          super(...arguments);
          _initializerDefineProperty(this, "fixedWidthDesignWidth", _descriptor, this);
          _initializerDefineProperty(this, "fixedWidthDesignHeight", _descriptor2, this);
          _initializerDefineProperty(this, "fixedHeightDesignWidth", _descriptor3, this);
          _initializerDefineProperty(this, "fixedHeightDesignHeight", _descriptor4, this);
          _initializerDefineProperty(this, "isAutoFit", _descriptor5, this);
        }
        onLoad() {
          if (this.isAutoFit) {
            this.autoFit();
            window.addEventListener('resize', this.autoFit.bind(this));
            // Screen.on('orientation-change', this.autoFit.bind(this));
          }
        }

        start() {
          if (this.isAutoFit) {
            this.autoFit();
          }
        }
        autoFit() {
          let designSize = View.instance.getDesignResolutionSize();
          // console.log(`desginSize = ${designSize}`);

          // let visibleSize = View.instance.getVisibleSize();
          // console.log(`visibleSize = ${visibleSize}`);

          let viewPortRect = View.instance.getViewportRect();
          View.instance.setOrientation;
          console.log(`viewPortRect = ${viewPortRect}`);
          let rateR = designSize.height / designSize.width;
          let rateV = Math.abs(viewPortRect.size.height) / Math.abs(viewPortRect.size.width);

          // let rp = ResolutionPolicy.FIXED_HEIGHT;
          // if (rateV < 1.0)
          // {
          //     rp = ResolutionPolicy.FIXED_WIDTH;
          // }

          console.log(`rateV = ${rateV}`);
          if (rateV < 1.0) {
            View.instance.setDesignResolutionSize(this.fixedWidthDesignWidth, this.fixedWidthDesignHeight, ResolutionPolicy.FIXED_WIDTH);
          } else {
            View.instance.setDesignResolutionSize(this.fixedHeightDesignWidth, this.fixedHeightDesignHeight, ResolutionPolicy.FIXED_HEIGHT);
          }
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fixedWidthDesignWidth", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1280;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "fixedWidthDesignHeight", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 720;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "fixedHeightDesignWidth", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 720;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "fixedHeightDesignHeight", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1280;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "isAutoFit", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/telegram-web.ts", ['cc'], function (exports) {
  var cclegacy, sys, _decorator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "ebfffcpPmpO2Kop7FNww8J8", "telegram-web", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      const tgLoadPromise = new Promise((resolve, reject) => {
        if (sys.platform === sys.Platform.MOBILE_BROWSER || sys.platform === sys.Platform.DESKTOP_BROWSER) {
          const script = document.createElement("script");
          script.src = "https://telegram.org/js/telegram-web-app.js";
          script.async = true;
          script.onload = () => {
            const intervalId = setInterval(() => {
              if (window.Telegram && window.Telegram.WebApp) {
                resolve(window.Telegram.WebApp);
                clearInterval(intervalId);
              }
            }, 100);
          };
          script.onerror = () => reject(new Error("Unable to load TelegramWebApp SDK, please check logs."));
          document.head.appendChild(script);
        }
      });
      let TelegramWebApp = exports('TelegramWebApp', (_dec = ccclass('TelegramWebApp'), _dec(_class = (_class2 = class TelegramWebApp {
        constructor() {
          this._tgWebAppJS = null;
        }
        static get Instance() {
          if (!TelegramWebApp._instance) {
            TelegramWebApp._instance = new TelegramWebApp();
          }
          return TelegramWebApp._instance;
        }
        async init() {
          this._tgWebAppJS = await tgLoadPromise;
          if (this._tgWebAppJS) {
            return Promise.resolve({
              success: true
            });
          } else {
            return Promise.resolve({
              success: false
            });
          }
        }
        openTelegramLink(url) {
          if (!this._tgWebAppJS) {
            console.error("telegram web app is not inited!");
            return;
          }
          this._tgWebAppJS.openTelegramLink(url);
        }
        openLink(url, options) {
          if (options === void 0) {
            options = {};
          }
          if (!this._tgWebAppJS) {
            console.error("telegram web app is not inited!");
            return;
          }
          this._tgWebAppJS.openLink(url, options);
        }
        share(url, text) {
          const shareUrl = 'https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text || '');
          this.openTelegramLink(shareUrl);
        }
        shareToStory(media_url, shareText, widget_link_url, widget_link_name) {
          if (!this._tgWebAppJS) {
            console.error("telegram web app is not inited!");
            return;
          }
          const widget_link = {
            text: shareText,
            widget_link: {
              url: widget_link_url,
              name: widget_link_name
            }
          };
          this._tgWebAppJS.shareToStory(media_url, widget_link);
        }
        getTelegramWebApp() {
          return this._tgWebAppJS;
        }
        getTelegramWebAppInitData() {
          if (!this._tgWebAppJS) {
            console.error("telegram web app is not inited!");
            return null;
          }
          return this._tgWebAppJS.initDataUnsafe;
        }
        getTelegramUser() {
          if (!this._tgWebAppJS) {
            console.error("telegram web app is not inited!");
            return null;
          }
          return this._tgWebAppJS.initDataUnsafe.user;
        }
        getTelegramInitData() {
          if (!this._tgWebAppJS) {
            console.error("telegram web app is not inited!");
            return null;
          }
          return this._tgWebAppJS.initData;
        }
        openInvoice(url, callback) {
          if (!this._tgWebAppJS) {
            console.error("telegram web app is not inited!");
            return null;
          }
          this._tgWebAppJS.openInvoice(url, callback);
        }
        alert(message) {
          this._tgWebAppJS.showAlert(message);
        }
      }, _class2._instance = void 0, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
//# sourceMappingURL=index.js.map