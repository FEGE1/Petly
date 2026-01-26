import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialIcons } from "@expo/vector-icons";
import { ArrowLeft02Icon, MoreHorizontalCircle01Icon, ShoppingCart02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import { BlurView } from "expo-blur";

type Item = {
    id: string;
    brand: string;
    name: string;
    description: string;
    image: string;
    price: number
    createdAt: string;
    updatedAt: string;
}

export default function Product(){
    const API_URL = process.env.EXPO_PUBLIC_API_URL
    const { id } = useLocalSearchParams<{ id: string }>();
    const [counter, setCounter] = useState(1);
    const [item, setItem] = useState<Item | null> (null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async()=>{
            try{
                const response = await fetch(`${API_URL}/product/${id}`);
                
                if(!response.ok){
                    router.replace("/");
                    return;
                }

                const json = await response.json();

                if(Array.isArray(json) && json.length === 0){
                    router.replace("/");
                    return;
                }

                setItem(json[0]);
            } catch (e){
                console.error(e);
                router.back();
            } finally{
                setLoading(false);
            }
        })();
        
    },[]);

    if(loading) {
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size='large' /></View>;
    }

    return (
        <View style={{flex:1}}>
            <ScrollView style={{flex:1}}  contentContainerStyle={{ flexGrow: 1 }}>
                <SafeAreaView style={{flex:1}} edges={["top"]}>
                    <View style={styles.top_bar}>
                        <Pressable onPress={()=>{
                            router.back();
                        }}>
                            <View style={styles.icon}>
                                <HugeiconsIcon icon={ArrowLeft02Icon} size={scale(22)} />
                            </View>
                        </Pressable>
                        <View style={styles.top_bar_right}>
                            <View style={styles.icon}>
                                <HugeiconsIcon icon={ShoppingCart02Icon} size={scale(22)} />
                            </View>
                            <View style={styles.icon}>
                                <HugeiconsIcon icon={MoreHorizontalCircle01Icon} size={scale(22)} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.image}>
                        <Image resizeMode="contain" style={{width:'100%', height:'100%'}} source={{uri: item?.image}}></Image>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.section1}>
                            <Text style={{
                                fontSize:moderateScale(18),
                                fontFamily:'Inter-Medium'
                            }}>
                                {item?.brand}
                                <Text style={{fontFamily:'Inter-Regular'}}> {item?.name}</Text>
                            </Text>
                            <Text style={{fontSize:moderateScale(12),fontFamily:'Inter-Regular',color:'#3b3b3b'}}>Adult Dry Dog Food</Text>
                            <View style={{flexDirection:'row',alignItems:'center',gap:scale(3)}}>
                                <MaterialIcons name="star" color="#ffc800" size={moderateScale(16)} />
                                <MaterialIcons name="star" color="#ffc800" size={moderateScale(16)} />
                                <MaterialIcons name="star" color="#ffc800" size={moderateScale(16)} />
                                <MaterialIcons name="star" color="#ffc800" size={moderateScale(16)} />
                                <MaterialIcons name="star" color="#ffc800" size={moderateScale(16)} />
                                <Text style={{fontSize:moderateScale(12),fontFamily:'Inter-Medium'}}>
                                    4.8
                                    <Text style={{color:'#3b3b3b',fontFamily:'Inter-Regular' }}> - 320 Reviews</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            height: .8,
                            backgroundColor: "#E0E0E0",
                            width: "100%",
                        }}
                        />
                        <View style={styles.section2}>
                            <Text style={{fontSize:moderateScale(14),fontFamily:'Inter-Medium'}}>Description</Text>
                            <Text style={{fontSize:moderateScale(12),fontFamily:'Inter-Regular',color:'#212121',lineHeight:moderateScale(20)}}>{item?.description}</Text>
                        </View>
                        <View style={{
                            height: .8,
                            backgroundColor: "#E0E0E0",
                            width: "100%",
                        }}
                        />
                        <View style={styles.section3}>
                            <Text style={{fontSize:moderateScale(14),fontFamily:'Inter-Medium'}}>Nutrition Info</Text>
                            <View style={{flexDirection:'row', flexWrap:'wrap', gap: scale(8)}}>
                                <NutritionCard icon="🍗" title="With Chicken"/>
                                <NutritionCard icon="🦴" title="Vitamins & Minerals"/>
                                <NutritionCard icon="💊" title="Immune Support"/>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
            <SafeAreaView style={{position:'absolute',bottom:0,width:'100%'}} edges={['bottom']}>
                    <View style={styles.bottom_bar}>
                        <BlurView intensity={10} tint='extraLight' style={[StyleSheet.absoluteFill,{borderRadius:scale(8),}]}/>
                        <Text style={{fontSize:moderateScale(20),fontFamily:'Inter-Medium'}}>${item?.price.toString().replace('.',',')}</Text>
                        <View style={styles.stepper}>
                            <BlurView intensity={10} tint="dark" style={[StyleSheet.absoluteFill,{borderRadius:scale(8),}]}/>
                            <Pressable onPress={()=>{
                                setCounter((prev)=> (prev === 1 ? prev : prev - 1));
                            }}
                            style={[styles.stepper_btn,{justifyContent:'center',alignItems:'center'}]}
                            >
                                <Text style={{fontSize:moderateScale(20),fontFamily:'Inter-Bold'}}>-</Text>
                            </Pressable>
                            <View style={{
                            width: scale(.8),
                            backgroundColor: "#E2E2E2",
                            height: "100%",
                            }}
                            />
                            <View style={{flex:1, justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
                                <Text style={{fontSize:moderateScale(16),fontFamily:'Inter-Medium'}}>{counter}</Text>
                            </View>
                            <View style={{
                            width: scale(.8),
                            backgroundColor: "#E2E2E2",
                            height: "100%",
                            }}
                            />
                            <Pressable onPress={()=>{
                                setCounter((prev)=>prev+1);
                            }}
                            style={[styles.stepper_btn,{justifyContent:'center',alignItems:'center'}]}
                            >
                                <Text style={{fontSize:moderateScale(20),fontFamily:'Inter-Medium'}}>+</Text>
                            </Pressable>
                        </View>
                        <AddButton title="Add to Cart" onPress={()=>setCounter(1)}/>
                    </View>
            </SafeAreaView>
        </View>
    );
}

const styles= StyleSheet.create({
    top_bar:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:scale(10)
    },
    icon:{
        backgroundColor: '#e0e0e0',
        borderRadius:scale(100),
        padding: scale(6),
    },
    top_bar_right:{
        flexDirection:'row',
        gap: scale(5)
    },
    image:{
        height:verticalScale(250),
        marginTop:verticalScale(20)
    },
    container:{
        flex:1,
        marginTop:verticalScale(10),
        backgroundColor: '#fff',
        padding:scale(12),
        gap: verticalScale(10),
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    section1:{
        gap:verticalScale(3)
    },
    section2:{
        gap:verticalScale(6),
        width:'80%'
    },
    section3:{
        gap:verticalScale(6),
    },
    bottom_bar:{
        marginHorizontal:scale(8),
        borderRadius:scale(27),
        backgroundColor:'transparent',
        gap:scale(10),
        position:'fixed',
        alignItems:'center',
        bottom:0,
        flexDirection:'row',
        height:verticalScale(50),
        paddingHorizontal:scale(10),
        borderWidth: scale(.8),
        borderColor: '#e2e2e2a5',
        shadowColor:'#000',
        shadowRadius:1,
        shadowOpacity:.1,
        shadowOffset:{width:0,height:1},
        overflow:'hidden'
    },
    stepper:{
        borderWidth:scale(.8),
        borderColor:'#ededed',
        flexDirection:'row',
        width:scale(90),
        borderRadius:scale(2000),
        overflow:'hidden',
        height:verticalScale(25),
        backgroundColor:'transparent'
    },
    stepper_btn:{
        backgroundColor:'transparent',
        width:'33.33%'
    },
})

type NutritionCardType = {
    icon: string,
    title: string
}
function NutritionCard({icon, title}: NutritionCardType){
    return(
        <View style={{
            flexDirection:'row',
            gap:scale(1),
            alignItems:'center',
            backgroundColor:'#eeeeee74',
            borderRadius:moderateScale(17),
            paddingVertical:moderateScale(1),
            paddingHorizontal:moderateScale(8),
            borderWidth:moderateScale(.3),
            borderColor:'#b0b0b07d'
        }}>
            <Text style={{fontSize:moderateScale(25)}}>{icon}</Text>
            <Text style={{fontSize:moderateScale(11),fontFamily:'Inter-Regular',color:'#222222'}}>{title}</Text>
        </View>    
    )
}

type AddButtonProps = {
  title: string;
  onPress: ()=>void;
}

export function AddButton({title, onPress}: AddButtonProps){
  return (
    <Pressable 
    onPress={onPress}
    style={({pressed})=>[
        {
        flex:1,
        backgroundColor: pressed ? '#8c295e' : '#a83271',
        borderRadius:scale(17),
        justifyContent:'center',
        alignContent:'center',
        height:verticalScale(30),
        overflow:'hidden',
        transform: [{scale: pressed ? 0.97 : 1}]
        }
    ]}>
        <Text style={{
            textAlign:'center',
            color:'#fff',
            fontSize:moderateScale(15),
            fontFamily:'Inter-Bold'
        }}>{title}</Text>
    </Pressable>
  )
}