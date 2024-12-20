import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { env } from 'process'

const nodeEnv = env.NODE_ENV ?? 'production';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: { api: 'modern-compiler' },
        }
    },
    build: {
        lib: {
            entry: 'src/api/voice-sdk.ts',
            // entry: 'src/main.ts',
            name: 'VoiceSDK',
            fileName: 'voice-sdk',
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            output: {
                format: 'iife',
            }
        },
        cssMinify: true,
        cssCodeSplit: false,
        minify: nodeEnv === 'production',
    },
    define: {
        'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    }
});
