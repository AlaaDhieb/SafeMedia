import Api from "../api";


/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
    constructor() {
        this.api = new Api(process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "");
    }

    setup(rootStore: any) {
        this.api.setup(rootStore);
    }

    /**
     * Our api.
     */
    api: Api;
}
