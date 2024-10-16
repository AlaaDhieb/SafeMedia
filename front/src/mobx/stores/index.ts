import { types } from "mobx-state-tree";

import { AppointmentStore } from "./appointment/AppointmentStore";
import { withEnvironment } from "../extensions/with-environment";
import { Environment } from "../environment";

export const RootStore = types
    .model("RootStore", {
        appointmentStore: types.optional(AppointmentStore, {}),
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
            appointmentStore: AppointmentStore.create(),
        },
        env,
    );
    env.setup(rootStore);
    return rootStore;
};
