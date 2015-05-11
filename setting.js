var Settings = (function () {
    function Settings() {
    }
    Object.defineProperty(Settings, "Default", {
        get: function () {
            return {
                appName: "My App",
                appVersion: 2.0,
                baseUrl: "http://localhost:3048",
                Action: {
                    None: 0,
                    Registering: 1,
                    Authenticating: 2
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return Settings;
})();
exports.Settings = Settings;
var Options = (function () {
    function Options() {
    }
    return Options;
})();
exports.Options = Options;
