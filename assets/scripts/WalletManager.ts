import w3 from 'web3cocos';

export class WalletManager {
    private web3: w3.Web3;
    public userAddress: string;
    private orderContract: any = null; 

    // 初始化钱包连接
    async connectWallet(): Promise<boolean> {
        if (typeof window["ethereum"] === 'undefined') {
            alert("请安装MetaMask或其他EVM钱包！");
            return false;
        }


        try {
            this.web3 = new w3.Web3(window["ethereum"]);
            await window["ethereum"].request({ method: 'eth_requestAccounts' });
            const accounts = await this.web3.eth.getAccounts();
            this.userAddress = accounts[0];
            return true;
        } catch (error) {
            console.error("钱包连接失败:", error);
            return false;
        }
    }
    
    // 请求签名
    async signMessage(message: string): Promise<string> {
        try {
            const signature = await this.web3.eth.personal.sign(message, this.userAddress, '');
            return signature;
        } catch (error) {
            console.error("签名失败:", error);
            return '';
        }
    }

    // 调用pay接口
    async pay(abiOrder:any, orderAddress:string, price:number, orderId:string): Promise<boolean> {
        if (this.orderContract == null) {
            this.orderContract = new this.web3.eth.Contract(
                abiOrder,
                orderAddress
            );
        }
        try {
            // 将ETH转换为wei (1 ether = 1e18 wei)
            const valueInWei = this.web3.utils.toWei(price.toString(), 'ether');
            console.log(valueInWei)
            const functionCall = this.orderContract.methods.pay(orderId);

            // 估算 Gas
            const gas = await functionCall.estimateGas({
                from: this.userAddress,
                value: valueInWei
            });

            // 获取当前 Gas 价格
            const gasPrice = await this.web3.eth.getGasPrice();
            // 发送交易
            const tx = await functionCall.send({
                from: this.userAddress,
                value: valueInWei,
                gas,
                gasPrice
            });
        
            console.log('交易成功:', tx.transactionHash);
            return true;
        } catch (error) {
            console.error('交易失败:', error);
            // 处理错误类型
            if (error.code === 4001) {
                console.log('用户取消了交易');
            } else if (error.message.includes('insufficient funds')) {
                console.log('BNB 余额不足');  //余额不足需要弹窗提醒
            }
            return false;
        }
    }
}