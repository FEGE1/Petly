import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import { addDays, addWeeks, format, isSameDay, startOfWeek } from "date-fns";
import { useMemo, useState } from "react";
import PagerView from "react-native-pager-view";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

function getWeekDays(anchorDate: Date) {
  const start = startOfWeek(anchorDate, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export default function Medical(){

    const [selected, setSelected] = useState(new Date());

    // ortada "bu hafta", solda -1, sağda +1 gibi 5 sayfa
    const pages = useMemo(() => {
        const base = new Date();
        return [-2, -1, 0, 1, 2].map((w) => addWeeks(base, w));
    }, []);

    return(
        <View style={{flex:1, overflow:'hidden'}}>
            <ImageBackground
                    source={require("../../assets/backgrounds/female-veterinarian-examining-sick-dog-lying-table-clinic.jpg")}
                    style={{ flex: 1 }}
                    contentPosition={{left:scale(-100), top:verticalScale(0)}}
                    imageStyle={{transform:[{scale:1}]}}
                >
            <BlurView intensity={0} tint='light' style={{ flex: 1 }}>
            <SafeAreaView edges={['bottom']} style={{flex:1, alignItems:'center'}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{height:verticalScale(45)}}></View>
                    <View style={styles.section1}>
                        <EmergencyCall width={scale(300)}/>
                    </View>
                    {/* section2 */}
                    <View style={{
                        marginTop:verticalScale(10),
                        overflow:'hidden', 
                        padding:scale(15),
                        width:scale(320),  
                        backgroundColor:'transparent', 
                        justifyContent:'center', 
                        borderRadius:scale(16),
                        borderColor:'#ffffffde',
                        borderWidth:scale(.5),
                        gap:verticalScale(8),
                    }}>
                        <BlurView intensity={20} tint='light' style={StyleSheet.absoluteFill}/>
                        <View>
                            <Text style={{fontFamily:'Inter-Medium', fontSize:moderateScale(14), color:'#fff'}}>Upcoming Appointments</Text>
                        </View>
                        {/* Appointments list */}
                        <View style={{
                            backgroundColor:'#0000000f',
                            padding:scale(5),
                            borderRadius:6,
                            gap:verticalScale(3)
                            }}>
                            <AppointmentItem title="Paw Clinic" date='12/04/2026'/>
                            <AppointmentItem title="Fege Clinic" date='27/05/2026'/>
                        </View>
                        {/* Calendar */}
                        <View style={{ height: verticalScale(50) }}>
                            <PagerView style={{ flex: 1 }} initialPage={2}>
                                {pages.map((anchor, idx) => {
                                const days = getWeekDays(anchor);
                                return (
                                    <View
                                    key={idx}
                                    style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 12 }}
                                    >
                                    {days.map((d) => {
                                        const active = isSameDay(d, selected);
                                        return (
                                        <Pressable
                                            key={d.toISOString()}
                                            onPress={() => setSelected(d)}
                                            style={{
                                            width: 44,
                                            height: 64,
                                            borderRadius: 14,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: active ? "#a83271" : "transparent",
                                            }}
                                        >
                                            <Text style={{ fontSize: 12, opacity: 0.7, color: active ? "#fff" : "#fff" }}>
                                            {format(d, "EEE")}
                                            </Text>
                                            <Text style={{ fontSize: 16, fontWeight: "700", color: active ? "#fff" : "#fff" }}>
                                            {format(d, "d")}
                                            </Text>
                                        </Pressable>
                                        );
                                    })}
                                    </View>
                                );
                                })}
                            </PagerView>
                        </View>
                    </View>
                    {/* section3 */}
                    <View style={{
                        overflow:'hidden',
                        marginTop:verticalScale(10),
                        width:scale(320),
                        aspectRatio:1.6,
                        padding:scale(5),
                        backgroundColor:'transparent',
                        borderRadius:scale(16),
                        borderColor:'#ffffffde',
                        borderWidth:scale(.5), 
                        gap:verticalScale(3)
                    }}>
                        <BlurView intensity={20} tint='light' style={StyleSheet.absoluteFill}/>
                        <Text style={{fontFamily:'Inter-Medium', fontSize:moderateScale(14), color:'#fff', textAlign:'center'}}>Nearest Clinics</Text>
                        <View style={{flex: 1}}>
                            {/* Map */}
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                customMapStyle={glassMapStyle}
                                style={[StyleSheet.absoluteFill,{borderRadius:scale(12),}]}
                                initialRegion={{
                                    latitude: 41.0082,
                                    longitude: 28.9784,
                                    latitudeDelta: 0.05,
                                    longitudeDelta: 0.05,
                                }}
                            />
                        </View>
                    </View>
                    <View style={{height:2000}}></View>
                </ScrollView>
            </SafeAreaView>
            </BlurView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    section1:{
        justifyContent:'center',
        alignItems:'center',
        width: '100%'
    },
})

type EmergencyCallProps={
    width: number;
}

function EmergencyCall({width}:EmergencyCallProps){
    return(
        <View style={{
            overflow:'hidden', 
            width:width, 
            aspectRatio:2.8, 
            backgroundColor:'transparent', 
            justifyContent:'center', 
            alignItems:'center',
            borderRadius:scale(16),
            borderColor:'#ffffffde',
            borderWidth:scale(.5)
        }}>
            <BlurView intensity={20} tint='light' style={StyleSheet.absoluteFill}/>
            <View style={{alignItems:'center', gap:verticalScale(5)}}>
                <FontAwesomeIcon icon={faPhoneVolume} size={moderateScale(35)} color={'#fff'}/>
                <View style={{alignItems:'center'}}>
                    <Text style={{color:'#fff', fontFamily:'Inter-Bold',fontSize:moderateScale(14)}}>Emergency Call</Text>
                    <Text style={{color:'#ffffffaf', fontFamily:'Inter-Medium',fontSize:moderateScale(11)}}>nearest clinics.</Text>
                </View>
            </View>
        </View>
    );
}

type AppointmentItemPromps={
    title: string;
    date: string;
}

function AppointmentItem({title,date}:AppointmentItemPromps){
    return(
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{ marginRight: 8, color: '#fff', fontSize:moderateScale(12) }}>{"\u25CB"}</Text>
                <Text style={{fontSize:moderateScale(12),fontFamily: 'Inter-Regular', color: '#fff'}}>{title}</Text>
            </View>
            <Text style={{fontSize:moderateScale(12),fontFamily: 'Inter-Regular', color: '#fff'}}>{date}</Text>
        </View>
    );
}

{/* Map Style */}
const glassMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f3f6fb" }] },
  { elementType: "labels", stylers: [{ visibility: "on" }] },

  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },

  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "labels", stylers: [{ visibility: "on" }] },

  { featureType: "water", elementType: "geometry", stylers: [{ color: "#dbeafe" }] },
];

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#0b1220" }] },
  { elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1f2a44" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a2a43" }] },
];