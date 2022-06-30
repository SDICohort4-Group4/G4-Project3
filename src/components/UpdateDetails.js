import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import {useContext, useState} from "react";
import AuthContext from '../contexts/AuthContext';
import { updateUser } from '../Api/Auth';

export default function UpdateDetails({navigation}) {
    let {setAuth, userData, setUserData} = useContext(AuthContext);
    let [tempData, setTempData] = useState({...userData});
    let [loading, setLoading] = useState(false);

    async function handleUpdate(data){
        if (loading == false) {
            setLoading(true);
            // call api to update
            let response = await updateUser(data);
                    
            if (response.status === 200) {
                console.log(response);
                setUserData(response.data.data);

            } else if(response.status === 401) {
                setAuth(false)
            }
            setLoading(false)
        }
    }

    return(
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}> 
            <View style={styles.userDetails}>
                <Text style={styles.infoHeader}>User Details:</Text>
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} onChangeText={text => setTempData({...tempData, userName: text})} value={tempData?.userName}></TextInput>

                <Text style={styles.label}>Nickname</Text>
                <TextInput style={styles.input} onChangeText={text => setTempData({...tempData, userNickname: text})} value={tempData?.userNickname}></TextInput>

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} editable={false} value={tempData?.userEmail}></TextInput>
                
                <Text style={styles.label}>Contact</Text>
                <View style={styles.contactWrap}>
                    <TextInput style={[{...styles.input}, {flex: 1}]} onChangeText={text => setTempData({...tempData, userCountryCode: text})} value={`${tempData?.userCountryCode}`}></TextInput>
                    <TextInput style={[{...styles.input}, {flex: 2, marginLeft:10}]} onChangeText={text => setTempData({...tempData, userPhoneNum: text})} value={`${tempData?.userPhoneNum}`}></TextInput>
                </View>
                <Text style={styles.label}>Address 1</Text>
                <TextInput style={styles.input} onChangeText={text => setTempData({...tempData, userAddress1: text})} value={tempData?.userAddress1}></TextInput>

                <Text style={styles.label}>Address 2</Text>
                <TextInput style={styles.input} onChangeText={text => setTempData({...tempData, userAddress2: text})} value={tempData?.userAddress2}></TextInput>

                <View style={styles.CPWrap}>
                    <View style={{flex:1}}>
                        <Text style={styles.label}>Postal code</Text>
                        <TextInput style={styles.input} onChangeText={text => setTempData({...tempData, userPostalCode: text})} value={tempData?.userPostalCode} ></TextInput>
                    </View>

                    <View style={{flex:1, marginLeft:10}}>
                        <Text style={styles.label}>Country</Text>
                        <TextInput style={styles.input} onChangeText={text => setTempData({...tempData, userCountry: text})} value={tempData?.userCountry}></TextInput>
                    </View>
                </View>

                <View style={styles.btnCon}>
                    <Text onPress={()=> navigation.navigate('AccountDetails')} style={styles.btn}>Back</Text>
                    <Text onPress={()=> handleUpdate(tempData)} style={styles.btn}>Update</Text>
                </View>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%', 
        backgroundColor: '#fffaed',
        paddingVertical: 20,
    },

    infoHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    userDetails: {
        width: '90%',
        padding: 10,
        paddingHorizontal: 15,
        elevation: 10,
        backgroundColor: '#ffffff',
        marginBottom: 25,
    },

    label: {
        alignSelf: "flex-start"
    },

    input: {
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        fontSize: 18,
        paddingHorizontal: 10,
        marginBottom: 15,
    },

    btn: {
        width: "40%",
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'grey',
        paddingVertical: 5,
        borderRadius: 5,
    },

    btnCon: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },

    CPWrap:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },

    contactWrap:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
  });