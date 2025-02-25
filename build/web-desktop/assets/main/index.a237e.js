System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './telegram-web.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Label, _decorator, Component, TelegramWebApp;
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
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "117edbO4YZJoriXQWLvebhl", "GameManager", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec(_class = (_class2 = class GameManager extends Component {
        constructor() {
          super(...arguments);
          _initializerDefineProperty(this, "idLbl", _descriptor, this);
          _initializerDefineProperty(this, "nameLbl", _descriptor2, this);
          _initializerDefineProperty(this, "addressLbl", _descriptor3, this);
          _initializerDefineProperty(this, "connectLbl", _descriptor4, this);
          this._isConnected = false;
          this._webAppInitData = null;
        }
        onLoad() {
          console.info("onLoad");
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
        start() {}
        update(deltaTime) {}
        onConnect() {
          this._isConnected = !this._isConnected;
          console.info("_isConnected: " + this._isConnected);
          this.connectLbl.string = this._isConnected ? "Connected" : "Connect";
        }
        onShare() {
          console.info("share ");
          TelegramWebApp.Instance.share("https://t.me/MyTestGame029Bot/TgTest", "Invite you to play a very interesting game");
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
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./telegram-web.ts', './GameManager.ts', './ResolutionAdjuster.ts'], function () {
  return {
    setters: [null, null, null],
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