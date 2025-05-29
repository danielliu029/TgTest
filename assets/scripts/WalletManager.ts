import w3 from 'web3cocos';

export class WalletManager {
    private web3: w3.Web3;
    public userAddress: string;

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
}