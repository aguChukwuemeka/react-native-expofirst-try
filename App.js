// import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [goalText, setGoalText] = useState("");
  const [goalList, setGoalList] = useState([]);

  const addGoalHandler = () => {
    setGoalList((goalList) => [
      ...goalList,
      { text: goalText, id: Math.random().toString() },
    ]);
    setGoalText("");
  };

  const onDeleteItem = (id) => {
    // console.log(`delete ${id}`);
    setGoalList((goalList) => goalList.filter((goal) => goal.id !== id));
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(e) => setGoalText(e)}
          placeholder="Your course goal!"
          value={goalText}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
      <View style={styles.goalContainer}>
        <FlatList
          data={goalList}
          renderItem={(itemData) => {
            return (
              <View style={styles.goalItem}>
                <Pressable android_ripple={{ color: '#dddddd' }} onPress={onDeleteItem.bind(this, itemData.item.id)}>
                  <Text style={styles.goalText}>{itemData.item.text}</Text>
                </Pressable>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  goalContainer: {
    flex: 5,
  },
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    padding: 8,
    color: "#FFFFFF",
  },
});
