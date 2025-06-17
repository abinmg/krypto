

    var allowedDomains = [
        'www.b4xsports.xyz',
        'b4xsports.xyz',
        'live.b4xsports.online', //  subdomain allowed
        'stream.90live.in'

    ];

    // Check if we are in an iframe
    function isInIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    // Check if the parent domain is allowed (exact match including subdomains)
    function isAllowedDomain() {
        try {
            var parentDomain = document.referrer.split('/')[2];
            // Exact match checking - will only allow specific full domains including subdomains
            return allowedDomains.indexOf(parentDomain) !== -1;
        } catch (e) {
            return false;
        }
    }

    // Show WhatsApp group invitation if domain is not allowed
    if (isInIframe() && !isAllowedDomain()) {
        document.write('<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: rgba(0,0,0,0.9); color: white; font-family: Arial, sans-serif; text-align: center; padding: 20px;">');
        document.write('<h2 style="margin-bottom: 20px;">Unauthorized Embedding</h2>');
        document.write('<p style="margin-bottom: 30px; max-width: 600px;">This content is only available through authorized websites. Please join our WhatsApp group for authorized access.</p>');
document.write('<a href="https://www.whatsapp.com/channel/0029Va6V441BqbrA2NZpkH2z" target="_blank" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Join Our WhatsApp Group</a>');
        document.write('</div>');
        // Stop execution of the rest of the page
        throw new Error("Unauthorized domain");
    }
