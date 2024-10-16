// mobx/rootStore.ts

import { types } from "mobx-state-tree";
//import { UserStore } from "./user/UserStore";
import { TwitterStore } from "./twitter/TwitterStore";

export const RootStore = types.model("RootStore", {
    //userStore: types.optional(UserStore, {}),
    twitterStore: types.optional(TwitterStore, {}),
});

export type RootStoreType = typeof RootStore.Type;
