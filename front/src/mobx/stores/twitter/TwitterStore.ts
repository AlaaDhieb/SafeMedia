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
    fetchPostsTwitter: async function () {
      try {
        const response = await self.environment.api.instance.get(
          `/api/tweets}`,
        );
        if (response.status === 200) {
          self.setTwitterPosts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  }));

export type TwitterStoreType = typeof TwitterStore.Type;
