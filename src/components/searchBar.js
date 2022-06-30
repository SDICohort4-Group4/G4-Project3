import React from "react";
import { StyleSheet, TextInput, View, Keyboard, TouchableOpacity, Text } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

export default function SearchBar ({clicked, searchText, searchChange, setClicked}) {

   return (
    <View style={styles.container}>
        <View
            style={
            clicked
                ? styles.searchBar__clicked
                : styles.searchBar__unclicked
            }
        >
        
            {/* magnifying glass icon */}
            <Feather name="search" size={20} color="blue"/>

            {/* Search text Input field */}
            <TextInput
                style={styles.searchInputBox}
                placeholder="Search"
                value={searchText}
                onChangeText={searchChange}
                onFocus={() => {
                    setClicked(true);
                }}
            />

            {/* display cancel icon if search bar is clicked */}
            {clicked && (
                <Entypo name="cross" size={22} color="blue" onPress={() => {searchChange("")}}/>
            )}
        </View>
        
        {/* display cancel button if search bar is clicked */}
        {clicked && (
            <TouchableOpacity
                onPress={() => {
                Keyboard.dismiss();
                setClicked(false);
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
        )}
        
        
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // marginTop: 5,
    marginLeft:5,
    flexDirection: "row",
    width:250,
    height:35,
    alignItems:"center",
  },
  searchBar__unclicked: {
    paddingLeft:5,
    paddingRight:5,
    flexDirection: "row",
    backgroundColor: "#ffffc0",
    borderRadius: 20,
    alignItems: "center",
  },
  searchBar__clicked: {
    paddingLeft:8,
    paddingRight:8,
    flexDirection: "row",
    width: "70%",
    backgroundColor: "#ffffc0",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  searchInputBox: {
    fontSize: 15,
    marginLeft: 5,
    width: "80%",
  },
  cancelButtonText:{
    fontSize:15,
    color:"blue",
    fontWeight:"bold",
    marginLeft:5,
  }

});