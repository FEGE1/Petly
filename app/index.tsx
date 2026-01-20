import { Text, View, StyleSheet, ScrollView, TextInput, Image, ImageSourcePropType, Pressable } from "react-native";
import { router } from "expo-router";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { UserCircleIcon, Notification01Icon, StarsIcon, Search01Icon, Video01Icon, ShoppingBag01Icon, StarIcon, PencilIcon, Home, Robot01Icon, FavouriteIcon, UserSharingIcon } from "@hugeicons/core-free-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

export default function Index() {
  return (    
      <SafeAreaView style={{flex:1}} edges={["top"]}>
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
              <View style={{backgroundColor: '#e0e0e0', borderRadius: scale(100), padding: scale(8)}}>
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
              <View style={{shadowColor: '#000', shadowOpacity:.05,shadowRadius:25, shadowOffset:{width:0,height:4},flex:1}}>
                <LinearGradient
                  colors={['#00000009', '#e8e8e805']}
                  start={{x:-.3,y:-.3}}
                  end={{x:1,y:1}}
                  style={{flex:1,borderRadius:25}}
                >
                  <View style={[styles.search_bar]}>
                    <BlurView intensity={35} tint="light" style={StyleSheet.absoluteFill}/>
                    <HugeiconsIcon icon={Search01Icon} />
                    <TextInput placeholder="What are you looking for?" placeholderTextColor={'#6B7280'} style={{fontFamily:'Inter-Regular', paddingVertical:verticalScale(12),flex:1}}></TextInput>
                  </View>
                </LinearGradient>
              </View>
              {/* search bar right */}  
              <View style={[
                styles.circle,
                {backgroundColor:'#e0e0e01f',
                padding: scale(8),
                borderColor:'rgba(255, 255, 255, 0.7)',
                borderWidth:scale(2),
                shadowColor: '#000',
                shadowRadius:10,
                shadowOffset:{width:0,height:2},
                shadowOpacity: 0.1
                }]}>
                <HugeiconsIcon icon={StarsIcon} color={'purple'}/>
              </View>
            </View>
            <Text style={{fontSize: moderateScale(15), fontFamily:'Inter-Medium',marginHorizontal: scale(15)}}>Browse by Type</Text>
            {/* Type List */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:scale(10),paddingVertical:verticalScale(20)}} >
              <View style={{ width: scale(8) }} />
              <TypeCard title='Food' icon='🍖'/>
              <TypeCard title='Treats' icon='🦴'/>
              <TypeCard title='Toys' icon='🧸'/>
              <TypeCard title='Equipment' icon='🦮'/>
              <TypeCard title='Health' icon='🩺'/>
              <TypeCard title='Care' icon='🛁'/>
              <TypeCard title='Toilet' icon='🧻'/>
              <View style={{ width: scale(8) }} />
            </ScrollView>
            <Text style={{fontSize: moderateScale(15), fontFamily:'Inter-Medium', marginHorizontal: scale(15)}}>Smart Picks</Text>
            {/* Picks List */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:scale(12),paddingVertical:verticalScale(20)}} >
              <View style={{ width: scale(5) }} />
              <PickCard title='Pedigree Adult' image={require('../assets/images/smart-picks/NicePng_dog-food-png_2656853.png')} value={280}/>
              <PickCard title='Purina Friskies' image={require('../assets/images/smart-picks/cat-wet-food.png')}  value={300}/>
              <PickCard title='Favorite' image={require('../assets/images/smart-picks/NicePng_dog-food-png_2656853.png')}  value={150}/>
              <PickCard title='Education' image={require('../assets/images/smart-picks/NicePng_dog-food-png_2656853.png')}  value={500}/>
              <PickCard title='Explore' image={require('../assets/images/smart-picks/NicePng_dog-food-png_2656853.png')}  value={1250}/>
              <View style={{ width: scale(5) }} />
            </ScrollView>
          </View>
        </ScrollView>
        <View style={[styles.nav_bar,{backgroundColor:'transparant',overflow:'hidden'}]}>
          <BlurView intensity={35} tint="light" style={StyleSheet.absoluteFill}/>
          <View style={[styles.row_align_center,{
            justifyContent:'flex-start',
            alignSelf: 'flex-start',
            gap:6,
            paddingHorizontal:scale(12),
            paddingVertical:scale(8),
            backgroundColor: '#161616',
            borderRadius: 25,
            }]}>
            <HugeiconsIcon icon={Home} size={moderateScale(23)} color='#fff'/>
            <Text style={{fontSize:moderateScale(16), fontWeight: 400, color: '#fff'}}>Home</Text>
          </View>
          <HugeiconsIcon icon={Robot01Icon} size={moderateScale(23)}/>
          <HugeiconsIcon icon={FavouriteIcon} size={moderateScale(23)}/>
          <HugeiconsIcon icon={UserSharingIcon} size={moderateScale(23)}/>
        </View>
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
    overflow:'hidden',
    backgroundColor:'transparent',
    paddingRight:scale(20),
    paddingLeft: scale(10),
    borderRadius: 25,
    borderWidth: moderateScale(2),
    borderColor: 'rgba(255, 255, 255, 0.91)',
    gap:scale(5)
  },
  nav_bar:{
    position: 'fixed',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginHorizontal:scale(40),
    bottom: verticalScale(25),
    backgroundColor: '#e5e5e5',
    borderRadius: 60,
    paddingHorizontal: scale(12),
    paddingVertical:verticalScale(8),
    borderColor: '#fff',
    borderWidth: scale(2),
    shadowColor: '#000',
    shadowRadius: 25,
    shadowOpacity:0.2,
    shadowOffset:{width:0,height:20}
  },
})

type TypeCardProps = {
  title: string;
  icon: string;
}
function TypeCard({title, icon}: TypeCardProps){
  return(
    <View style={[styles.column_align_center,{gap:verticalScale(6)}]}>
        <View style={{
          overflow:'hidden',
          justifyContent: 'center', 
          alignItems:'center',
          backgroundColor: "transparant", 
          padding: scale(14), 
          borderRadius: 20,
          borderWidth: scale(1.5), 
          borderColor: 'rgba(255, 255, 255, 0.75)',
          shadowColor: '#000',
          shadowOpacity: .05,
          shadowRadius: 25,
          shadowOffset: {width:0, height:4}
          }}>
          <BlurView intensity={35} tint="light" style={StyleSheet.absoluteFill}/>
          <Text style={{fontSize:moderateScale(28)}}>{icon}</Text>
        </View>
      <Text style={{color:'#696969',fontSize:moderateScale(12), fontFamily:'Inter-Regular'}}>{title}</Text>
    </View>
  );
}

type PickCardProps = {
  title: string;
  image: ImageSourcePropType;
  value: Int32;
}
function PickCard({title, image, value}: PickCardProps){
  return(  
      <Pressable onPress={()=> router.push({
        pathname: "/product",
        params:{
          'title': title,
          'value': value,
        }
      })}>
        <View style={{
          justifyContent: 'center',
          overflow:'hidden',
          alignItems:'center',
          backgroundColor:'transparent',
          padding: scale(20),
          gap:verticalScale(10),
          borderRadius: 40,
          borderWidth: scale(2),
          borderColor: 'rgba(255, 255, 255, 0.75)',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 25,
          shadowOffset: {width:0, height:4}
          }}>
          <BlurView intensity={35} tint="light" style={StyleSheet.absoluteFill}/>
          <Text style={{fontSize:moderateScale(13),fontFamily:'Inter-Medium'}}>{title}</Text>
          <View style={{height:scale(150),width:scale(150)}}>
            <Image source={image} resizeMode='contain' style={{width:'100%',height:'100%'}}/>
          </View>
          <View style={{
            position:'absolute', 
            flexDirection:'row', 
            alignItems:'flex-end',
            bottom:verticalScale(10),
            paddingHorizontal:scale(12),
            paddingVertical:verticalScale(6),
            borderRadius:30,
            overflow:'hidden',
            borderWidth:scale(1),
            borderColor:'rgba(255, 255, 255, 0.3)',
            shadowColor:'black',
            shadowRadius: 25,
            shadowOpacity:.1
            }}>
            <BlurView intensity={8} tint='extraLight' style={StyleSheet.absoluteFill} experimentalBlurMethod="dimezisBlurView"/>
            <Text style={{fontSize:moderateScale(12), fontFamily:'Inter-Regular'}}>🔥 {value} Kcal</Text>
          </View>
        </View>
      </Pressable>
  );
}