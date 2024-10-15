import * as React from "react";
import { Avatar, Card, IconButton, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const PostCard = () => {
  return (
    <Card>
      <Card.Title
        subtitleNumberOfLines={2}
        title="Blue Moon"
        subtitle="En vrai, qu'est-ce qui nous empêche de dire que Kevin De Bruyne est le meilleur milieu de tous les temps?"
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
        right={(props) => (
          <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
        )}
      />

      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />

      <View style={styles.footerContainer}>
        <View style={styles.iconContainer}>
          <IconButton icon="message-outline" size={20}/>
          <Text style={styles.text}>1K</Text>
        </View>

        <View style={styles.iconContainer}>
          <IconButton icon="repeat" size={20}/>
          <Text style={styles.text}>978</Text>
        </View>

        <View style={styles.iconContainer}>
          <IconButton icon="heart-outline" size={20}/>
          <Text style={styles.text}>8,5K</Text>
        </View>

        <View style={styles.iconContainer}>
          <IconButton icon="poll" size={20}/>
          <Text style={styles.text}>879K</Text>
        </View>
      </View>
    </Card>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 0,
    fontSize: 14,
  },
});
