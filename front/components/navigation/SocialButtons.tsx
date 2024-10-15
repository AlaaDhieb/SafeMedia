import * as React from 'react';
import { StyleSheet, ScrollView, View } from "react-native";
import { Button, Icon } from "react-native-paper"; 

interface SocialButtonsProps {
  selectedButton: string | null;
  handlePress: (buttonName: string) => void;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ selectedButton, handlePress }) => {
  return (
    <View style={styles.view}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Button
          icon={() => <Icon source="facebook" color={selectedButton === 'Facebook' ? "#fff" : "#4267B2"} size={20} />}
          mode="contained"
          onPress={() => handlePress('Facebook')}
          style={[
            styles.button,
            selectedButton === 'Facebook' && { backgroundColor: "#4267B2" }
          ]}
          labelStyle={{ color: selectedButton === 'Facebook' ? "#fff" : "#4267B2" }}
        >
          Facebook
        </Button>

        <Button
          icon={() => <Icon source="twitter" color={selectedButton === 'Twitter' ? "#fff" : "#1DA1F2"} size={20} />}
          mode="contained"
          onPress={() => handlePress('Twitter')}
          style={[
            styles.button,
            selectedButton === 'Twitter' && { backgroundColor: "#1DA1F2" }
          ]}
          labelStyle={{ color: selectedButton === 'Twitter' ? "#fff" : "#1DA1F2" }}
        >
          Twitter
        </Button>

        <Button
          icon={() => <Icon source="instagram" color={selectedButton === 'Instagram' ? "#fff" : "#C13584"} size={20} />}
          mode="contained"
          onPress={() => handlePress('Instagram')}
          style={[
            styles.button,
            selectedButton === 'Instagram' && { backgroundColor: "#C13584" }
          ]}
          labelStyle={{ color: selectedButton === 'Instagram' ? "#fff" : "#C13584" }}
        >
          Instagram
        </Button>

        <Button
          icon={() => <Icon source="linkedin" color={selectedButton === 'LinkedIn' ? "#fff" : "#0077B5"} size={20} />}
          mode="contained"
          onPress={() => handlePress('LinkedIn')}
          style={[
            styles.button,
            selectedButton === 'LinkedIn' && { backgroundColor: "#0077B5" }
          ]}
          labelStyle={{ color: selectedButton === 'LinkedIn' ? "#fff" : "#0077B5" }}
        >
          LinkedIn
        </Button>

        <Button
          icon={() => <Icon source="youtube" color={selectedButton === 'YouTube' ? "#fff" : "#FF0000"} size={20} />}
          mode="contained"
          onPress={() => handlePress('YouTube')}
          style={[
            styles.button,
            selectedButton === 'YouTube' && { backgroundColor: "#FF0000" }
          ]}
          labelStyle={{ color: selectedButton === 'YouTube' ? "#fff" : "#FF0000" }}
        >
          YouTube
        </Button>
      </ScrollView>
    </View>
  );
};

export default SocialButtons;

const styles = StyleSheet.create({
  view: {
    padding: 10,
  },
  button: {
    marginHorizontal: 5,
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  }
});
