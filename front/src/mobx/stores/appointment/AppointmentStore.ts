import { types, flow } from "mobx-state-tree";
import { withEnvironment } from "../../extensions/with-environment";
import { withRootStore } from "../../extensions/with-root-store";
import { ProAppointmentModel } from "../models/ProAppointment";

export const AppointmentStore = types
  .model("AppointmentStore", {
    appointmentsPro: types.optional(types.array(ProAppointmentModel), []),
  })
  .extend(withEnvironment)
  .extend(withRootStore)

  .actions((self) => ({
    setAppointmentsPro(appointmentsPro: any) {
      self.appointmentsPro = appointmentsPro;
    },
  }))

  .actions((self) => ({
    fetchUpcomingAppointmentsCustomer: flow(function* () {
      try {
        // Simule la réception d'une réponse avec un ID 132234
        self.setAppointmentsPro([{ id: 132234 }]);
      } catch (error) {
        // Gérer les erreurs
        self.setAppointmentsPro([{ id: 132234 }]);
      }
    }),
  }));

export type AppointmentStoreType = typeof AppointmentStore.Type;
