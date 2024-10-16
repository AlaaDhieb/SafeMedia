import PostCard from "@/components/navigation/PostCard";
import SocialButtons from "@/components/navigation/SocialButtons";
import { useRootStore } from "@/src/mobx";
import * as React from "react";
import { useState, useEffect } from "react";
import { Appbar, Text } from "react-native-paper";

export default function HomeScreen() {
  const rootStore = useRootStore();
  const { appointmentStore } = rootStore;

  const [selectedButton, setSelectedButton] = useState<string | null>(
    "Twitter"
  );

  useEffect(() => {
    appointmentStore.fetchUpcomingAppointmentsCustomer();    
  }, []);

  const handlePress = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="SafeMedia" />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      
      <SocialButtons
        selectedButton={selectedButton}
        handlePress={handlePress}
      />
      <Text>{appointmentStore.appointmentsPro[0].id}</Text>

      <PostCard />
    </>
  );
}
