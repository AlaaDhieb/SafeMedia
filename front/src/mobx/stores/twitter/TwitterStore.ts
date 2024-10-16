import { types, flow } from "mobx-state-tree";
import { withEnvironment } from "../../extensions/with-environment";
import { withRootStore } from "../../extensions/with-root-store";
import { TwitterModel } from "../models/TwitterModel";

export const TwitterStore = types
  .model("TwitterStore", {
    twitterPosts: types.optional(types.array(TwitterModel), []),
  })
  .extend(withEnvironment)
  .extend(withRootStore)

  .actions((self) => ({
    setTwitterPosts(twitterPosts: any) {
      self.twitterPosts = twitterPosts;
    },
  }))

  .actions((self) => ({
    fetchPostsTwitter: flow(function* () {
      try {
        self.setTwitterPosts([{ id: 132234 }]);
      } catch (error) {
        self.setTwitterPosts([{ id: 132234 }]);
      }
    }),
  }));

export type TwitterStoreType = typeof TwitterStore.Type;
