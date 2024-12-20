export interface Config {
    el: string;
    appId: string;
    appName: string;
    appVersion?: string;
    secretKey: string;
    scopes?: string[];
}

export type StatusChangeListener = (status: string, reason?: string) => void;
export type CallListener = (caller: string, callee: string, params?: Record<string, unknown>) => void;
export type ConnectListener = () => void;
export type DisconnectListener = (reason?: string) => void;

export interface ConnectOptions {
    delegate?: {
        onStatus?: StatusChangeListener;
        onCall?: CallListener;
        onConnect?: ConnectListener;
        onDisconnect?: DisconnectListener;
    }
}
