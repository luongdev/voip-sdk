import {Config, ConnectOptions, StatusChangeListener} from "./types.ts";
import App from "../App.vue";
import {createApp} from "vue";
import {inject} from "./injection.ts";

type User = {
    username: string;
    password: string;
}

export default class VoiceSDK {
    private _config?: Config;
    private _user?: User;
    private static _instance: VoiceSDK;

    private constructor() {
    }


    static init(config: Config, cb?: (instance: VoiceSDK) => void) {
        if (VoiceSDK._instance) return;

        const instance = new VoiceSDK();
        instance._config = config;

        VoiceSDK._instance = instance;

        if (cb) {
            Promise.resolve().then(() => cb(instance));
        }
        // return instance;
    }

    connect(opts: ConnectOptions) {
        const el = document.getElementById(this._config?.el ?? 'voice-app');
        if (!el) {
            return;
        }

        const props: { changeFn?: StatusChangeListener } = {};
        if (opts?.delegate) {
            if (opts.delegate.onStatus) {
                props.changeFn = opts.delegate.onStatus;
            }
        }

        const statusApp = createApp(App, props);
        inject(statusApp);

        statusApp.mount(el);
    }


    login(username: string, password: string) {
        if (!this._user) {
            this._user = {
                username,
                password
            }
        }
    }
}

// @ts-ignore
if (typeof window !== 'undefined' && !window.VoiceSDK) {
    // @ts-ignore
    window.VoiceSDK = VoiceSDK;
}
