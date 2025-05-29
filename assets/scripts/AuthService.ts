export function generateNonce(): { message: string; nonce: string } {
    const nonce = Math.random().toString(36).substring(2);
    const timestamp = Math.floor(Date.now() / 1000);
    const serverId = "Audiera";
    const message = `${nonce}|${timestamp}|${serverId}`;
    return { message, nonce };
}