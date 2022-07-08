import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import FlatListCat from './FlatListCat'

export default function RanCatDisplay({list, navigation}) {

    let [randomThree, setRandomThree] = useState([]);

    useEffect(()=>{
        let random = getMultiRan(list, 3)
        setRandomThree(random);
    },[list])

    // function to get n random item in list of category
    function getMultiRan(list, num) {
        const shuffled = [...list].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    // could probably make the code below shorter with a loop
    return(
        <View style={styles.container}>
            <View style={styles.flatCon}>
                <View style={styles.sideLabel}>
                    <Text style={styles.labelText}>{randomThree[0]}</Text>
                </View>
                <FlatListCat catergory={randomThree[0]} navigation={navigation}/>
            </View>
            <View style={styles.flatCon}>
                <View style={styles.sideLabel}>
                    <Text style={styles.labelText}>{randomThree[1]}</Text>
                </View>
                <FlatListCat catergory={randomThree[1]} navigation={navigation}/>
            </View>
            <View style={styles.flatCon}>
                <View style={styles.sideLabel}>
                    <Text style={styles.labelText}>{randomThree[2]}</Text>
                </View>
                <FlatListCat catergory={randomThree[2]} navigation={navigation}/>
            </View>            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        marginTop: 15,
    },

    flatCon:{
        width: "90%",
        backgroundColor: "#fcfbf7",
        elevation: 3,
        flexDirection: 'row',
        borderRadius: 5,
        marginBottom: 15,
        overflow: "hidden",
    },

    sideLabel:{
        height: 150,
        width: 100,
        backgroundColor: '#fcf1d9',
        alignItems: "center",
        justifyContent: "center",
    },

    labelText:{
        fontWeight: "bold",
    },

})