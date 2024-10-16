import { Instance, SnapshotOut, types } from "mobx-state-tree";

export const TwitterModel = types
    .model("Twitter")
    .props({
        id: types.identifierNumber,
    })
    .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
    .actions((self) => ({
        updateEntity: function (entity: any) {
            Object.assign(self, entity);
            //self.setEntities(entities);
        },
    })); // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type TwitterType = Instance<typeof TwitterModel>;
export type Twitter = TwitterType;
type TwitterTypeSnapshotType = SnapshotOut<typeof TwitterModel>;
export type TwitterTypeSnapshot = TwitterTypeSnapshotType;

export const createTwitterDefaultModel = () =>
    types.optional(TwitterModel, {
        id: -1,
    });
