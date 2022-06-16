import { StyleSheet, Text, View, TextInput, Image, ScrollView, Dimensions } from 'react-native';
import { useContext, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import noImage from "../../assets/photo-soon.jpg";
import { DataTable } from 'react-native-paper';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').Width;

export default function ItemDetails({route, navigation}) {
    // check what data/format of data is given
    console.log(route.params.itemInfo);


    
    return(
        <ScrollView>
            <View style = {styles.container}>

                <View style = {styles.imageCon}>
                    {route.params.itemInfo.itemPic1? 
                        <Image style = {styles.image} source = {{uri: route.params.itemInfo.itemPic1}}></Image>
                    :
                        <Image style = {styles.image} source = {noImage}></Image>
                    }
                </View>

            
                <View style = {styles.infoCon}>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style = {styles.nameCon}>Item : </DataTable.Cell>
                            <DataTable.Cell style = {styles.valueCon}>{route.params.itemInfo.itemName} </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style = {styles.nameCon}>Description : </DataTable.Cell>
                            <DataTable.Cell style = {styles.valueCon}>{route.params.itemInfo.itemDescription} </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style = {styles.nameCon}>SKU :</DataTable.Cell>
                            <DataTable.Cell style = {styles.valueCon}>{route.params.itemInfo.SKU}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style = {styles.nameCon}>Brand :</DataTable.Cell>
                            <DataTable.Cell style = {styles.valueCon}>{route.params.itemInfo.brand}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style = {styles.nameCon}>Stock : </DataTable.Cell>
                            <DataTable.Cell style = {styles.valueCon}>{route.params.itemInfo.Qty} </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style = {styles.nameCon}>Category : </DataTable.Cell>
                            <DataTable.Cell style = {styles.valueCon}>{route.params.itemInfo.itemCategory1}, {route.params.itemInfo.itemCategory2}</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View> 

                <View style = {styles.buttonsCon}>

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
        
    },

    icon: {
        padding: 20,
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 100,
        elevation: 3,
    },
    
    imageCon:{
        // flex: 5,
        height: windowHeight*0.4,
        width: '100%',
    },

    image:{
        width: '100%',
        height: '100%',
    },

    infoCon: {
        flex: 0,
        borderWidth: 1,
        width: '100%',
    },
    nameCon: {
        flex: 1,
    },
    valueCon: {
        flex: 3,
    },

    buttonsCon:{
        flex: 1
    },

    userDetails: {
        width: '90%',
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        margin: 20,
        paddingVertical: 10,
        elevation: 10,
    },

  });