import { Notification01Icon, Search01Icon, StarsIcon, UserCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ImageSourcePropType, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type Item={
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
}

export default function Home() {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async()=>{
      try{
        const response = await fetch(`${API_URL}/product/`);

        if(!response.ok){
          alert("Network Connection Problem.");
          return;
        }

        const json = await response.json();

        if(Array.isArray(json)&&json.length===0){
          alert("API list Empty");
          return;
        }
        
        setData(json);
      } catch(e){
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  },[])


  return (    
      <SafeAreaView style={{flex:1, backgroundColor:'#ffffff44' }} edges={["top"]}>
        <ScrollView>
          <View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop:verticalScale(10),
              marginHorizontal: scale(15)
              }}>
              <View style = {{
                flexDirection: 'row',
                alignItems: 'center',
                gap: scale(10)
              }}>
                <HugeiconsIcon icon={UserCircleIcon} size ={scale(40)} />
                <View style={{gap:verticalScale(2)}}>
                  <Text style={{fontSize: moderateScale(18), fontFamily:'Inter-Regular'}}>Hi Ege</Text>
                  <Text style={{fontSize: moderateScale(11), color: 'grey', fontFamily:'Inter-Regular'}}>Good Morning,</Text>
                </View>
              </View>
              <View style={{
                backgroundColor: '#fffffff3',
                borderRadius: scale(100),
                padding: scale(8),
                borderWidth: moderateScale(1),
                borderColor: 'rgb(241, 241, 241, 0.3)',
                gap:scale(5),
                shadowColor:'#3a3a3a',
                shadowOpacity:.03,
                shadowRadius:3,
                shadowOffset:{width:0,height:6}
                }}>
                <HugeiconsIcon icon={Notification01Icon} size={scale(20)} />
              </View>
            </View>
            <Text style={{
              fontSize: moderateScale(22),
              fontFamily:'Inter-Regular',
              marginTop: verticalScale(20),
              marginRight:scale(65),
              marginHorizontal: scale(15)
              }}>What does your buddy 🐶 need today?</Text>
            {/* search bar */}
            <View style={{gap:scale(15),marginHorizontal: scale(15),paddingVertical:verticalScale(20),flexDirection:'row',alignItems:'center'}}>
              {/* search bar left */}  
                <View style={[styles.search_bar]}>
                  <HugeiconsIcon icon={Search01Icon} />
                  <TextInput placeholder="What are you looking for?" placeholderTextColor={'#6B7280'} style={{fontFamily:'Inter-Regular', paddingVertical:verticalScale(12),flex:1}}></TextInput>
                </View>
              {/* search bar right */}  
              <View style={[
                styles.circle,
                {backgroundColor:'#fffffff3',
                padding: scale(8),
                borderWidth: moderateScale(1),
                borderColor: 'rgb(241, 241, 241, 0.3)',    
                shadowColor:'#3a3a3a',
                shadowOpacity:.03,
                shadowRadius:3,
                shadowOffset:{width:0,height:6}
                }]}>
                <HugeiconsIcon icon={StarsIcon} color={'#a83271'}/>
              </View>
            </View>
            <Text style={{fontSize: moderateScale(15), fontFamily:'Inter-Medium',marginHorizontal: scale(15)}}>Browse by Type</Text>
            {/* Type List */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:scale(10),paddingVertical:verticalScale(20)}} >
              <View style={{ width: scale(8) }} />
              <TypeCard title='Food' zoom={1.6} y={scale(10)} rotate={-35} image={require('../../assets/icons/food_bowl.png')}/>
              <TypeCard title='Treats' zoom={1.6} x={scale(0)} y={scale(10)} rotate={10} image={require('../../assets/icons/treat.png')}/>
              <TypeCard title='Toys' zoom={2} x={scale(13)} y={scale(12)} rotate={0} image={require('../../assets/icons/cat_toy.png')}/>
              <TypeCard title='Equipment' mirror={-1} zoom={2} x={scale(-8)} y={scale(8)} rotate={0} image={require('../../assets/icons/equipment.png')}/>
              <TypeCard title='Health' zoom={1.2} x={scale(0)} y={scale(6)} rotate={0} image={require('../../assets/icons/health.png')}/>
              <TypeCard title='Care' zoom={1.4} x={scale(0)} y={scale(15)} rotate={0} image={require('../../assets/icons/care.png')}/>
              <TypeCard title='Toilet' zoom={1.8} x={scale(5)} y={scale(13)} rotate={0} image={require('../../assets/icons/toilet.png')}/>
              <View style={{ width: scale(8) }} />
            </ScrollView>
            <Text style={{fontSize: moderateScale(15), fontFamily:'Inter-Medium', marginHorizontal: scale(15)}}>Smart Picks</Text>
            {/* Smart Picks */}
            <FlatList
              style={{paddingVertical:verticalScale(20)}}
              data={data}
              horizontal
              keyExtractor={(item)=>item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({item})=>(
                <PickCard id={item.id} brand={item.brand} name={item.name} image={{uri: item.image}} value={item.price} isLoading={loading}/>
              )}
              ItemSeparatorComponent={()=> <View style={{width:scale(15)}}/>}
              ListHeaderComponent={()=> <View style={{width:scale(20)}}/>}
              ListFooterComponent={()=> <View style={{width:scale(20)}}/>}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row_align_center:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column_align_center:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  circle:{
    borderRadius:2000
  },
  search_bar:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fffffff3',
    paddingRight:scale(20),
    paddingLeft: scale(10),
    borderRadius: 25,
    borderWidth: moderateScale(1),
    borderColor: 'rgb(241, 241, 241, 0.5)',
    gap:scale(5),
    shadowColor:'#3a3a3a',
    shadowOpacity:.03,
    shadowRadius:3,
    shadowOffset:{width:0,height:6}
  },
  
})

type TypeCardProps = {
  title: string;
  zoom?: number;
  x?: number;
  y?: number;
  rotate?: number;
  mirror?: number;
  image?: ImageSourcePropType;
}
function TypeCard({title, image, zoom=1, x=0, y=0, rotate=0, mirror=1}: TypeCardProps){
  return(
    <View style={[styles.column_align_center,{gap:verticalScale(6)}]}>
        <View style={{
          justifyContent: 'center', 
          alignItems:'center',
          backgroundColor: "#fffffff3", 
          overflow:'hidden',
          borderRadius: 15,
          borderWidth: moderateScale(1),
          borderColor: 'rgba(241, 241, 241, 0.6)',
          gap:scale(5),
          shadowColor:'#3a3a3a',
          shadowOpacity:.03,
          shadowRadius:3,
          shadowOffset:{width:0,height:6}
          }}>
          <View style={{height:scale(60),width:scale(60)}}>
                <Image source={image} resizeMode='contain'
                style={{
                    width: '100%',
                    height: '100%',
                    transform:[
                      {scale: zoom},
                      {translateX: x},
                      {translateY: y},
                      {rotate: `${rotate}deg`},
                      {scaleX: mirror}
                    ],
                  }}
                />
          </View>
        </View>
      <Text style={{color:'#696969',fontSize:moderateScale(12), fontFamily:'Inter-Regular'}}>{title}</Text>
    </View>
  );
}

type PickCardProps = {
  id: string;
  brand: string;
  name: string;
  image: ImageSourcePropType;
  value: number;
  isLoading: boolean;
}
function PickCard({id, brand, name, image, value, isLoading}: PickCardProps){
  return(  
      <Pressable onPress={()=> router.push({
        pathname: '/product',
        params:{id:id}
      })}>
        <View style={{
          justifyContent: 'center',
          alignItems:'center',
          backgroundColor:'#ffffffeb',
          padding: scale(20),
          gap:verticalScale(10),
          borderRadius: 25,
          borderWidth: moderateScale(1),
          borderColor: 'rgb(241, 241, 241, 0.5)',
          shadowColor:'#3a3a3a',
          shadowOpacity:.03,
          shadowRadius:3,
          shadowOffset:{width:0,height:6}
          }}>
          {isLoading ? <ActivityIndicator style={{height:scale(150),width:scale(150)}} size={'small'}/> : (
            <>
              <Text style={{fontSize:moderateScale(13),fontFamily:'Inter-Medium'}}>{brand} {name}</Text>
              <View style={{height:scale(150),width:scale(150)}}>
                <Image source={image} resizeMode='contain' style={{width:'100%',height:'100%'}}/>
              </View>
              <View style={{
                position:'absolute', 
                flexDirection:'row', 
                alignItems:'center',
                bottom:verticalScale(10),
                paddingHorizontal:scale(12),
                paddingVertical:verticalScale(3),
                borderRadius:30,
                overflow:'hidden',
                borderWidth:scale(1),
                borderColor:'rgba(255, 255, 255, 0.3)',
                shadowColor:'black',
                shadowRadius: 25,
                shadowOpacity:.1,
                gap:scale(2),
                backgroundColor:'#ffffff5f'
                }}>
                <BlurView intensity={15} tint='extraLight' style={StyleSheet.absoluteFill} experimentalBlurMethod="dimezisBlurView"/>
                <View style={{width:moderateScale(25), height:moderateScale(25), justifyContent:'center', alignItems:'center'}}>
                  <Image source={require("../../assets/icons/discount.png")} resizeMode='contain' style={{width:'100%',height:'100%'}}></Image>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={{
                    fontSize:moderateScale(12), 
                    fontFamily:'Inter-Regular', 
                    color:'#444444',
                    textDecorationLine:'line-through',
                    textDecorationStyle:'solid',
                    textAlign:'center'
                  }}
                  > 
                  ${value.toString().replace(".",",")}
                  </Text>

                  <Text style={{fontSize:moderateScale(13), fontFamily:'Inter-Medium', color:'#000000', textAlign:'center'}}>${(value-1).toString().replace(".",",")}</Text>
                </View>
              </View>
            </>
          )}
          
        </View>
      </Pressable>
  );
}