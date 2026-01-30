import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import { addDays, addWeeks, format, isSameDay, startOfWeek } from "date-fns";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PagerView from "react-native-pager-view";

import { AddSquareIcon, ArrowDownDoubleIcon, Car01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

function getWeekDays(anchorDate: Date) {
  const start = startOfWeek(anchorDate, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

const clinics=[
        {
            id: 1,
            title: "Seferihisar Pati Kliniği",
            description: "7/24 Acil Servis",
            coordinate: { latitude: 38.211533, longitude: 26.831858 },
            time_with_car: "3 min"
        },  
        {
            id: 2,
            title: "Mavi Veteriner",
            description: "Cerrahi Uzman",
            coordinate: { latitude: 38.209533, longitude: 26.829858 },
            time_with_car: "7 min"
        },
        {
        id: 3,
        title: "Seferihisar VetCare",
        description: "Dahiliye ve Aşı Hizmeti",
        coordinate: { latitude: 38.212100, longitude: 26.833200 },
        time_with_car: "12 min"
    },
    {
        id: 4,
        title: "Doğa Veteriner Kliniği",
        description: "Evcil Hayvan Diş Bakımı",
        coordinate: { latitude: 38.208900, longitude: 26.832400 },
        time_with_car: "13 min"
    },
    {
        id: 5,
        title: "Sevimli Dostlar Kliniği",
        description: "Laboratuvar ve Röntgen",
        coordinate: { latitude: 38.210750, longitude: 26.828900 },
        time_with_car: "25 min"
    },
    {
        id: 6,
        title: "Ege Pet Sağlık Merkezi",
        description: "Yoğun Bakım Ünitesi",
        coordinate: { latitude: 38.213000, longitude: 26.830500 },
        time_with_car: "30 min"
    },
    {
        id: 7,
        title: "Şirin Patiler Veteriner",
        description: "Kısırlaştırma ve Cerrahi",
        coordinate: { latitude: 38.207800, longitude: 26.831200 },
        time_with_car: "50 min"
    }
    ]

type MedicalProps = {
    isActive: boolean;
}

export default function Medical({isActive}:MedicalProps){
    const [selected, setSelected] = useState(new Date());
    const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
    const [locationPermission, setLocationPermission] = useState(false);
    const mapRef = useRef<MapView>(null);
    const [mapReady, setMapReady] = useState(false);

    useEffect(()=>{
        (async()=>{
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status === 'granted'){
                setLocationPermission(true)
                try{
                    let lastLocation = await Location.getLastKnownPositionAsync({});
                    if (lastLocation){
                        setLocation(lastLocation.coords);
                    }
                    let currentLocation = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced,
                    });
                    setLocation(currentLocation.coords);
                } catch(error){
                    console.log("Can't reached to current location: ", error)
                }
            }
        })();
    },[]);

    const zoomToClinics = useCallback(() => {
        if (location && mapRef.current && isActive) {
            const allCoordinates = [
                { 'latitude': location.latitude, 'longitude': location.longitude },
                ...clinics.map(clinic => clinic.coordinate)
            ];
            
            setTimeout(() => {
                mapRef.current?.fitToCoordinates(allCoordinates, {
                edgePadding: { top: scale(40), right: scale(40), bottom: scale(40), left: scale(40) },
                animated: true
            });
            }, 300);

        }else{console.log("map current yok.")}
        
    },[location,isActive]);

    useEffect(() => {
        if (mapReady && location && isActive) {
            zoomToClinics();
        }
    }, [mapReady, location, isActive, zoomToClinics]);

    const pages = useMemo(() => {
        const base = new Date();
        return [-2, -1, 0, 1, 2].map((w) => addWeeks(base, w));
    }, []);

    return(
        <View style={{flex:1, overflow:'hidden'}}>
            <ImageBackground
                    source={require("../../assets/backgrounds/medical_final.png")}
                    style={{ flex: 1 }}
                    contentPosition={{left:scale(-100), top:verticalScale(0)}}
                    imageStyle={{transform:[{scale:1}]}}
                >
            <BlurView intensity={0} tint='dark' style={{ flex: 1 }}>
            <SafeAreaView edges={['bottom']} style={{flex:1, alignItems:'center'}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{height:verticalScale(45)}}></View>
                    <View style={styles.section1}>
                        <EmergencyCall width={scale(320)}/>
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
                        borderColor:'#ffffff8b',
                        borderWidth:scale(.5),
                        gap:verticalScale(8),
                    }}>
                        <BlurView intensity={20} tint='dark' style={StyleSheet.absoluteFill}/>
                        <View>
                            <Text style={{fontFamily:'Inter-Bold', fontSize:moderateScale(14), color:'#fff'}}>Upcoming Appointments</Text>
                        </View>
                        {/* Appointments list */}
                        <View style={styles.list}>
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
                                            backgroundColor: active ? "#a83271c2" : "transparent",
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
                    {/* section2 end */}
                    {/* section3 */}
                    <View style={{
                        overflow:'hidden',
                        marginTop:verticalScale(10),
                        width:scale(320),
                        padding:scale(5),
                        backgroundColor:'transparent',
                        borderRadius:scale(16),
                        borderColor:'#ffffff8b',
                        borderWidth:scale(.5), 
                    }}>
                        <BlurView intensity={20} tint='dark' style={StyleSheet.absoluteFill}/>
                        <View style={{padding:scale(10), gap:verticalScale(8)}}>
                            <Text style={{fontFamily:'Inter-Bold', fontSize:moderateScale(14), color:'#ffffff'}}>Make an Appointment</Text>
                            <View style={styles.book_button}>
                                <HugeiconsIcon icon={AddSquareIcon} size={moderateScale(35)} color={'#ffffffa0'}/>
                            </View>
                            <Text style={{fontFamily:'Inter-Bold', fontSize:moderateScale(14), color:'#ffffff'}}>Clinics by location</Text>
                            {/* Map List*/}
                            <View
                                style={{
                                    backgroundColor:'#0000000f',
                                    padding:scale(5),
                                    borderRadius:scale(7),
                                    gap:verticalScale(3),
                                }}
                            >
                                <View
                                    style={{
                                        borderRadius:scale(5),
                                        gap:verticalScale(3),
                                        height:verticalScale(80),
                                    }}
                                >
                                    <ScrollView
                                        nestedScrollEnabled={true}
                                        showsVerticalScrollIndicator={true}
                                    >
                                        {clinics.map((item, index)=> (
                                            <View key={item.id} style={styles.list_item}>
                                                <Text style={{fontSize:moderateScale(12),fontFamily: 'Inter-Regular', color: '#fff'}}>{item.title}</Text>
                                                <View style={{flexDirection:'row', gap:scale(5)}}>
                                                    <HugeiconsIcon icon={Car01Icon} size={moderateScale(15)} color={'#ffffffef'}/>
                                                    <Text style={{fontSize:moderateScale(12),fontFamily: 'Inter-Regular', color: '#fff'}}>{item.time_with_car}</Text>
                                                </View>
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                                <HugeiconsIcon icon={ArrowDownDoubleIcon} size={moderateScale(13)} color={'#ffffff'} width={'100%'}/>
                                <View style={{width:'100%', aspectRatio:1.8}}>
                                    {/* Map */}
                                    {location ? (
                                    <MapView
                                        ref={mapRef}
                                        onMapReady={() => {
                                            setMapReady(true);
                                        }}
                                        provider={PROVIDER_GOOGLE}
                                        // customMapStyle={glassMapStyle}
                                        showsUserLocation={true}
                                        showsMyLocationButton={true}
                                        style={[StyleSheet.absoluteFill,{
                                            borderRadius:scale(14),
                                            shadowColor:'#000000',
                                            shadowOpacity:.1,
                                            shadowRadius:20
                                        }]}
                                        initialRegion={{
                                            latitude: location.latitude,
                                            longitude: location.longitude,
                                            latitudeDelta: 0.015,
                                            longitudeDelta: 0.015,
                                        }}
                                    >
                                    {clinics.map((clinic) => (
                                            <Marker
                                                key={clinic.id}
                                                coordinate={clinic.coordinate}
                                                title={clinic.title}
                                                description={clinic.description}
                                                pinColor="#a83271"
                                            />
                                        ))}
                                    </MapView>
                                    ) : (
                                        <View style={{ 
                                            flex: 1, 
                                            backgroundColor: '#00000000',
                                            justifyContent: 'center', 
                                            alignItems: 'center',
                                            borderRadius:scale(14)
                                        }}>
                                            <Text style={{ color: '#ffffff', fontSize: moderateScale(12) }}>
                                                Waiting Location...
                                            </Text>
                                        </View>
                                    )}
                                </View>            
                            </View>
                        </View>
                    </View>
                    {/* section3 end*/}
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
    book_button:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0000000f',
        paddingVertical:verticalScale(10),
        borderRadius:scale(10),
    },
    list:{
        backgroundColor:'#0000000f',
        padding:scale(5),
        borderRadius:scale(5),
        gap:verticalScale(3)
    },
    list_item:{
        flexDirection:'row',
        justifyContent:'space-between', 
        alignItems:'center',
        paddingVertical:verticalScale(12),
        marginBottom:verticalScale(3),
        paddingHorizontal:scale(10),
        borderRadius:scale(5),
        backgroundColor:'#ffffff17'
    }
})

type EmergencyCallProps={
    width: number;
}

function EmergencyCall({width}:EmergencyCallProps){
    return(
        <View style={{
            overflow:'hidden', 
            width:width, 
            aspectRatio:6, 
            backgroundColor:'transparent', 
            justifyContent:'center', 
            borderRadius:scale(16),
            borderColor:'#ffffff8b',
            borderWidth:scale(.5)
        }}>
            <BlurView intensity={20} tint='dark' style={StyleSheet.absoluteFill}/>
            <View style={{
                flexDirection:'row', 
                justifyContent:'space-between', 
                alignItems:'center', 
                paddingHorizontal:scale(15)
                }}>
                <View style={{alignItems:'center'}}>
                    <Text style={{color:'#fff', fontFamily:'Inter-Bold',fontSize:moderateScale(14)}}>Emergency Call</Text>
                    <Text style={{color:'#ffffffaf', fontFamily:'Inter-Medium',fontSize:moderateScale(11)}}>nearest clinics.</Text>
                </View>
                <FontAwesomeIcon icon={faPhoneVolume} size={moderateScale(22)} color={'#fff'}/>
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

function Divider(){
    return(
        <View style={{
            height:verticalScale(.2),
            paddingVertical:verticalScale(.4),
            marginHorizontal: scale(10),
            backgroundColor:'#ffffff39',
            borderRadius:scale(2000),
            shadowColor:'#ffffff',
            shadowOpacity:1,
            shadowRadius:2,
            shadowOffset:{height:scale(0),width:0}
        }}></View>
    );
}