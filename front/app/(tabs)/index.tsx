import SocialButtons from '@/components/navigation/SocialButtons';
import * as React from 'react';
import { useState } from 'react';
import { Appbar } from "react-native-paper"; 

export default function HomeScreen() {
  const [selectedButton, setSelectedButton] = useState<string | null>('Twitter');

  const handlePress = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="SafeMedia" />
      </Appbar.Header>
      <SocialButtons selectedButton={selectedButton} handlePress={handlePress} />
    </>
  );
}
