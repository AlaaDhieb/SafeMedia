import { types } from "mobx-state-tree";

import { TwitterStore } from "./twitter/TwitterStore";
import { withEnvironment } from "../extensions/with-environment";
import { Environment } from "../environment";

export const RootStore = types
    .model("RootStore", {
        twitterStore: types.optional(TwitterStore, {}),
    })
    .volatile(() => ({
        isRestored: false,
    }))
    .extend(withEnvironment)
    .actions((self) => ({
        setIsRestored(isRestored: boolean) {
            self.isRestored = isRestored;
        },
    }));

export const createRootStore = () => {
    const env = new Environment();
    const rootStore = RootStore.create(
        {
            twitterStore: TwitterStore.create(),
        },
        env,
    );
    env.setup(rootStore);
    return rootStore;
};
