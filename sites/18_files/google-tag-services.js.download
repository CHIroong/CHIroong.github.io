if (! GoogleTagParams) var GoogleTagParams = {};
console.log(GoogleTagParams);

var googletag = (function() {
    // Create script tag and insert in DOM
    const gptScript = document.createElement('script');
    gptScript.setAttribute("src", "https://www.googletagservices.com/tag/js/gpt.js");
    gptScript.setAttribute("async", "async");
    const scriptNode = document.getElementsByTagName('script')[0];
    scriptNode.parentNode.insertBefore(gptScript, scriptNode);

    const getAdUnitLevel = () => {
        let level2; // Site language identifier
        let pathname = location.pathname;
        let pathComponents = pathname.split('/');

        // Trim empty array values at both ends of the array, if any
        if (pathComponents.length > 1) {
            if (! pathComponents[0]) pathComponents.shift();
            if (! pathComponents[pathComponents.length - 1]) pathComponents.pop();
        }

        // Parse path components to add Ad Unit Level 2
        // The first path component will presumably be the language part
        const languages = ['ja-jp', 'ko-kr', 'en'];

        let hadMatch = false;

        languages.forEach(lang => {
            if (lang == pathComponents[0]) {
                hadMatch = true;

                pathComponents.shift();

                if (lang == 'ja-jp') {
                    level2 = 'naturejapan';
                } else if (lang == 'ko-kr') {
                    level2 = 'natureasiakorean';
                } else if (lang == 'en') {
                    level2 = 'natureasiaenglish';
                }

                // Add Ad Level 2 at the beginning of the array.
                pathComponents.unshift(level2)
            }
        });

        if (! hadMatch) return '';

        // We can allow to more elements to the array after the first pathComponent.
        // That will be Ad Unit Level 1 and 2.
        // I don't know if it's is necessary but I'm gonna do it anyway, for now.
        let itemsToRemove = pathComponents.length - 3;

        // @todo: slice in one fell swoop, and add more commentary
        if (itemsToRemove > 0) {
            for (let i = 1; i <= itemsToRemove; i++) {
                pathComponents.pop();
            }
        }

        return pathComponents.join('/');
    };

    // Check if googletag exist
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
    if (googletag) {
        // function for creating google tags.
        var createSlot = (GoogleTagParams) => {
            const adUnitBase = '/270604982/natureasia/';
            const fullAdUnitLevel = adUnitBase + GoogleTagParams.adUnitLevel;
            googletag.cmd.push(function() {
                // Define ad slots and ad unit level

                // Define the leaderboard banner
                googletag.defineSlot(fullAdUnitLevel, [728, 90], 'div-gpt-ad-LB1')
                    .setTargeting('pos', ['LB1'])
                    .addService(googletag.pubads());

                // Define the square banner
                googletag.defineSlot(fullAdUnitLevel, [300, 250], 'div-gpt-ad-MPU1')
                    .setTargeting('pos', ['MPU1'])
                    .addService(googletag.pubads());
                googletag.defineSlot(fullAdUnitLevel, [300, 250], 'div-gpt-ad-MPU2')
                    .setTargeting('pos', ['MPU2'])
                    .addService(googletag.pubads());

                // Custom targeting. See docs for samples.
                googletag.pubads().setTargeting('doi', GoogleTagParams.doi || [])
                    .setTargeting('sponsored', GoogleTagParams.sponsored || [])
                    .setTargeting('adtype', GoogleTagParams.adtype || []);

                // Configuration and other stuff
                googletag.pubads().enableSingleRequest();
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();
            });
            console.log('GPT ad unit level: ' + fullAdUnitLevel);
        };

        /* 
        Allow view files to override adUnitLevel
        For this to work, the view file should prepend the script on the head script placeholder.
        So, I created a global helper called 'GoogleTagHelper.php'.
        To override, simply call the helper and call the following methods like below:

        <?php $this->googleTagHelper()->setAdUnitLevel('naturejapan/nature/toc')
                                      ->setDoi('10.1038/whatever')
                                      ->setSponsored('whatever')
                                      ->setAdtype('whatever')
                                      ->prependScript(); ?>

        IMPORTANT: calling `setAdUnitLevel()` and `prependScript()` methods are mandatory.
        `setAdUnitLevel()` sets the Ad Unit Level and `prependScript()` writes the Javascript -
        variables at the head part of the HTML.
        */

        if (! GoogleTagParams.adUnitLevel) {
            GoogleTagParams.adUnitLevel = getAdUnitLevel();
        }

        // Generate Ad Unit Level
        createSlot(GoogleTagParams);

        // Return export googletag to the global namespace
        return googletag || {};
    }
}());
