import axios, { AxiosInstance } from "axios";

export default class Api {
    private rootStore: any;
    public instance: AxiosInstance;

    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
            headers: {
                //Accept: "application/json",
                Accept: "application/ld+json",
                //"Content-Type": "application/json",
                "Content-Type": "application/ld+json",
            },
        });
        this.instance.interceptors.request.use((config) => {
            if (config.method === "patch") {
                config.headers["Content-Type"] = "application/merge-patch+json";
            } else {
                // Pour les autres types de requêtes, on peut spécifier un Content-Type par défaut
                config.headers["Content-Type"] = "application/ld+json";
            }
            return config;
        });
    }

    setup(rootStore: any) {
        this.rootStore = rootStore;
        /* JWT handling not used in this project
    this.instance.interceptors.request.use(
      async (config) => {
        if (this.rootStore.userStore.isLoggedIn) {
          config.headers.Authorization = `Bearer ${this.rootStore.userStore.token || null}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (pError) => {
        if (pError.response.status === 401) {
          console.log(pError.response.status);
          this.router.push("/login");
        }
        return Promise.reject(pError);
      },
    );*/
    }
}
/*
api.interceptors.request.use(async (config) => {
  const { userStore } = useRootStore();
  if(userStore.isLoggedIn){
    config.headers.Authorization = `Bearer ${userStore.token || null}`;
    return config;
  }
});
*/

//export default api;
