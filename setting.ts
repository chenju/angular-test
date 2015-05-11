
export class Settings{
	static get Default():any {
        return {
            appName: "My App",
            appVersion: 2.0,
            baseUrl: "http://localhost:3048",
            Action: {
                None:0,
                Registering: 1,
                Authenticating: 2
            }
        };
    }
}

export class Options{
    
}