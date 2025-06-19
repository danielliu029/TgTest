import { _decorator, Component, JsonAsset, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ConfigLoader')
export class ConfigLoader extends Component {
    public abiOrder: Record<string, any>;
    public bsc: Record<string, any>;
    public bsctest: Record<string, any>;

    start() {
        console.log("ConfigLoader start")
        // 加载 JSON 文件（省略扩展名，路径从 resources/ 开始）
        resources.load('config/abi/Order', JsonAsset, (err, jsonAsset) => {
            if (err) {
                console.error('加载失败:', err);
                return;
            }
            
            // 获取 JSON 数据
            this.abiOrder = jsonAsset.json;
            console.log(this.abiOrder)
        });

        resources.load('config/network/bsc', JsonAsset, (err, jsonAsset) => {
            if (err) {
                console.error('加载失败:', err);
                return;
            }
            
            // 获取 JSON 数据
            this.bsc = jsonAsset.json;
            console.log(this.bsc);
        });

        resources.load('config/network/bsctest', JsonAsset, (err, jsonAsset) => {
            if (err) {
                console.error('加载失败:', err);
                return;
            }
            
            // 获取 JSON 数据
            this.bsctest = jsonAsset.json;
            console.log(this.bsctest);
        });
    }
}