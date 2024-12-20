import {createApp} from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import './main.css'
import {statusService, StatusService} from "./components/status/status.service.ts";

const changeFunction = (...args: any[]) => {
    console.log('changeFunction', args)
}

const statusApp = createApp(App, { change: changeFunction })

statusApp.provide(statusService, new StatusService())


statusApp.use(ElementPlus)
statusApp.mount(`#app`)



class VoiceSDK {
    private config: any;
    private user: any;

    constructor() {
        this.config = null
        this.user = null
    }

    setup(config: any) {
        if (!config.domainId || !config.domainName || !config.socketUrl) {
            throw new Error('Missing required configuration')
        }

        this.config = config

        // Initialize Status Component
        if (config.statusElementId) {
            const statusApp = createApp(App, {
                config: this.config,
                user: this.user
            })
            statusApp.use(ElementPlus)
            statusApp.provide(statusService, new StatusService())
            statusApp.mount(`#${config.statusElementId}`)
        }

        // Initialize Call Component
        if (config.callElementId) {
            const callApp = createApp(App, {
                config: this.config,
                user: this.user
            })
            callApp.mount(`#${config.callElementId}`)
        }
    }

    async init(username: string, password: string) {
        try {
            // Simulate authentication
            this.user = {
                username,
                password,
                isAuthenticated: true
            }

            // Update components if they exist
            if (this.config) {
                this.setup(this.config)
            }

            return {
                success: true,
                user: this.user
            }
        } catch (error) {
            return {
                success: false,
                // @ts-ignore
                error: error.message
            }
        }
    }
}

// Create a singleton instance
const instance = new VoiceSDK()

export default instance
