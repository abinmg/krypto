(async function () {
    // Function to get the value of a query parameter by name
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Define multiple manifest URIs and DRM configurations
    const videoConfigs = [
        {
            id: 'GXR-1',
            manifestUri: 'https://cdn-vl-gcp-g-01.vos360.video/Content/LiveEvent/9d754caa-eaa3-93d8-18b9-ffeb8d72a14d/DASH/master.mpd',
            drmConfig: {
                clearKeys: {
                    'e3049ec0bbf01c7ff39ab2cc5d14aef7': 'a2942561274e29fc92398139472ce363'
                }
            }
        },
        {
            id: 'B1ASTRO',
            manifestUri: 'https://linearjitp-playback.astro.com.my/dash-wv/linear/408/default_ott.mpd',
            drmConfig: {
                clearKeys: {
                    '1a655189ab5c49eb235308c2b1a9e710': '3c4508af348844107f5e026a4fd6b16e'
                }
            }
        },
        // ... other configurations
    ];

    // Function to initialize the video player
    async function init() {
        const id = getQueryParameter('id');
        const config = videoConfigs.find(cfg => cfg.id === id);

        if (!config) {
            console.error('No valid configuration found for the provided id.');
            return;
        }

        const video = document.getElementById('video');
        const ui = video['ui'];
        ui.configure({
            seekBarColors: {
                base: 'rgba(255,255,255,.2)',
                buffered: 'rgba(255,255,255,.4)',
                played: 'rgb(255,0,0)',
            }
        });

        const controls = ui.getControls();
        const player = controls.getPlayer();

        // Apply DRM configuration to the player
        player.configure({
            drm: config.drmConfig
        });

        try {
            await player.load(config.manifestUri);
            // Mute the video to allow autoplay
            video.muted = true;
            await video.play(); // Attempt to autoplay
        } catch (error) {
            console.error('Error loading manifest or autoplay failed:', error);
        }

        // Replace jQuery with vanilla JavaScript for modifying button text
        document.querySelectorAll('.shaka-overflow-menu-button').forEach(button => {
            button.textContent = 'settings';
        });
        document.querySelectorAll('.shaka-back-to-overflow-button .material-icons-round').forEach(icon => {
            icon.textContent = 'arrow_back_ios_new';
        });
    }

    document.addEventListener('shaka-ui-loaded', init);
})();
