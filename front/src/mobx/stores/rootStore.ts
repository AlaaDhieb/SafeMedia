// mobx/rootStore.ts

import { types } from "mobx-state-tree";
//import { UserStore } from "./user/UserStore";
import { AppointmentStore } from "./appointment/AppointmentStore";

export const RootStore = types.model("RootStore", {
    //userStore: types.optional(UserStore, {}),
    appointmentStore: types.optional(AppointmentStore, {}),
});

export type RootStoreType = typeof RootStore.Type;
