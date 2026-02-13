import { useNotesStore } from "@/store/useNotesStore";
import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [text, setText] = useState("");

  const notes = useNotesStore((s) => s.notes);
  const addNote = useNotesStore((s) => s.addNote);
  const deleteNote = useNotesStore((s) => s.deleteNote);


  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Zustand + MMKV Notes</Text>

        <TextInput 
          style={styles.input}
          placeholder="Write note..."
          value={text}
          onChangeText={setText}
        />

        <Button 
          title="Add Note" 
          onPress={() => {
            if (!text) return;
            addNote(text);
            setText("");
          }} 
        />

        <FlatList 
          data={notes}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <View style={styles.note}>
              <Text style={styles.text}>{item.text}</Text>
              <Button title="Delete" onPress={() => deleteNote(item.id)} />
            </View>
          )}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    color: "#fff",
    backgroundColor: "#25343F",
    paddingLeft: 15
  },
  note: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "#30364F",
  },
  text: {
    color: "#fff",
    paddingBottom: 5
  }
});
