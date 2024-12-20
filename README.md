<script>
    (function (d, id) {
        let js, lk, base = 'https://connect.luongdev.info', head = d.getElementsByTagName('head')[0];
        if (!d.getElementById(id + 'js')) {
            js = d.createElement('script');
            js.id = id + 'js';
            js.src = './dist/voice-sdk.umd.cjs';
            head.appendChild(js);
        }

        if (!d.getElementById(id + 'css')) {
            lk = d.createElement('link');
            lk.id = id + 'css';
            lk.rel = 'stylesheet';
            lk.href = './dist/voice-sdk.css';
            head.appendChild(lk);
        }
    }(document, 'voice-sdk'));

    window.onload = function () {
        console.log(window.VoiceSDK);
        window.VoiceSDK.init('abc', 'def');
        window.VoiceSDK.setup({
            statusElementId: 'app',
            domainId: '1',
            domainName: '2',
            socketUrl: 'wss://voice.3bot.org',
        })
    };
</script>
