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
        // Add more configurations here
    ];

    // Function to initialize the video player
    async function init() {
        const id = getQueryParameter('id'); // Get the video ID from the query string
        const config = videoConfigs.find(cfg => cfg.id === id); // Find matching configuration

        if (!config) {
            console.error('No valid configuration found for the provided id.');
            alert('Invalid video configuration. Please check the URL.'); // Provide user feedback
            return;
        }

        const video = document.getElementById('video');
        const ui = video['ui']; // Access Shaka Player UI
        ui.configure({
            seekBarColors: {
                base: 'rgba(255,255,255,.2)',
                buffered: 'rgba(255,255,255,.4)',
                played: 'rgb(255,0,0)', // Red color for the played portion
            }
        });

        const controls = ui.getControls();
        const player = controls.getPlayer();

        // Apply DRM configuration
        player.configure({
            drm: config.drmConfig
        });

        try {
            // Load the manifest URI and attempt to autoplay
            await player.load(config.manifestUri);
            video.muted = true; // Mute the video for autoplay
            await video.play();
        } catch (error) {
            console.error('Error loading manifest or autoplay failed:', error);
            alert('Failed to load video. Please try again later.');
        }

        // Customize UI elements (button text changes)
        const settingsButtons = document.querySelectorAll('.shaka-overflow-menu-button');
        settingsButtons.forEach(button => {
            button.textContent = 'Settings'; // Update button text
        });

        const backButtons = document.querySelectorAll('.shaka-back-to-overflow-button .material-icons-round');
        backButtons.forEach(icon => {
            icon.textContent = 'arrow_back_ios_new'; // Update back button icon
        });
    }

    // Initialize the player when the Shaka UI is loaded
    document.addEventListener('shaka-ui-loaded', init);
})();
