<<<<<<< HEAD
import PostCard from "@/components/navigation/PostCard";
import SocialButtons from "@/components/navigation/SocialButtons";
import { useRootStore } from "@/src/mobx";
import * as React from "react";
import { useState, useEffect } from "react";
import { Appbar, Text } from "react-native-paper";

export default function HomeScreen() {
  const rootStore = useRootStore();
  const { twitterStore } = rootStore;

  const [selectedButton, setSelectedButton] = useState<string | null>(
    "Twitter"
  );

  useEffect(() => {
    twitterStore.fetchPostsTwitter();    
  }, []);
<<<<<<< HEAD
=======
import SocialButtons from '@/components/navigation/SocialButtons';
import * as React from 'react';
import { useState } from 'react';
import { Appbar } from "react-native-paper"; 

export default function HomeScreen() {
  const [selectedButton, setSelectedButton] = useState<string | null>('Twitter');
>>>>>>> 0ca65ae (add social media buttons component)
=======
>>>>>>> 1530ba4 (update mobx stores and dependencies)

  const handlePress = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="SafeMedia" />
<<<<<<< HEAD
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      
      <SocialButtons
        selectedButton={selectedButton}
        handlePress={handlePress}
      />
      <Text>{twitterStore.twitterPosts[0].id}</Text>

      <PostCard />
=======
      </Appbar.Header>
      <SocialButtons selectedButton={selectedButton} handlePress={handlePress} />
>>>>>>> 0ca65ae (add social media buttons component)
    </>
  );
}
