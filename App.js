import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Alert,
  ToastAndroid,
  BackHandler,
  PermissionsAndroid,
  ActivityIndicator,
  Dimensions,
  Linking,
  RefreshControl,
  ImageBackground,
} from 'react-native';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefresh: false,
      header: 'Home',
      switchValue: false,
      username: null,
      data: [1, 2, 2, 3, 4, 5, 6, 7, 7, 8, 9, 1],
      dataPembayaran: [
        {
          namaBarang: 'hp',
          harga: 1350000,
        },
        {
          namaBarang: 'power bank',
          harga: 5520000,
        },
        {
          namaBarang: 'usb adapter',
          harga: 120000,
        },
      ],
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  componentWillUpdate() {
    this.backHandler.remove();
  }

  render() {
    // return this.test1();
    {
      console.log(this.state.data);
    }
    return (
      <View style={{flex: 1, backgroundColor: '#e5e5e5'}}>
        <StatusBar barStyle="default" backgroundColor="#9f9fff" />
        <ActivityIndicator size="small" color="#cc1112" />
        <TouchableOpacity
          style={{width: widthScreen, height: '10%'}}
          onPress={() => {
            this.requestCamera();
          }}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: 'https://images.unsplash.com/photo-1556597249-cd6a997737df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=642&q=80',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '20%'}}
          onPress={() => {
            Alert.alert('Title Alert', 'Message Awesome!', [
              {
                text: 'cancel',
                onPress: () => console.log('cancel press'),
                style: 'cancel',
              },
              {
                text: 'ok',
                onPress: () => Linking.openURL('https://google.com'),
                style: 'default',
              },
            ]);
          }}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: 'https://images.unsplash.com/photo-1556597249-cd6a997737df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=642&q=80',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: 400,
            height: 200,
            backgroundColor: '#82042331',
          }}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => {
              new Date().getTime;
            }}
            renderItem={({item, index}) => (
              <Text style={{backgroundColor: '#923212'}}>
                {item} | {index}
              </Text>
            )}
          />
          <FlatList
            data={this.state.dataPembayaran}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefresh}
                onRefresh={() => {
                  this.setState({isRefresh: false});
                  console.log('refressshhhhh!');
                }}
              />
            }
            keyExtractor={item => {
              `${new Date().getTime + 10}`;
            }}
            renderItem={({item, index}) => (
              <View
                style={{
                  backgroundColor: 'e5e5e5',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  marginVertical: 4,
                }}>
                <Text style={{backgroundColor: '#050f55', color: '#fff'}}>
                  Harga:{item.harga}
                </Text>
                <Text
                  style={{backgroundColor: '#2c3c1c', color: '#fff'}}
                  onPress={namaBarangItem =>
                    // console.log(`item : ${item.namaBarang}`)
                    ToastAndroid.show(`item : ${item.namaBarang}`, 10000)
                  }>
                  Nama Barang:
                  {item.namaBarang}
                </Text>
              </View>
            )}
          />
        </View>
        <ImageBackground
          style={{
            flex: 1,
            resizeMode: 'cover',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={{
            uri: 'https://images.unsplash.com/photo-1556597249-cd6a997737df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=642&q=80',
          }}>
          <Text style={{fontSize: 20}}>TEXT DALAM GAMBAR</Text>
        </ImageBackground>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#fcfcfc',
          }}>
          {/* {this.test2()}
          {this.test1()}
          {this.testImage()} */}
        </ScrollView>
      </View>
    );
  }

  test2() {
    return (
      <View>
        <View
          style={{
            backgroundColor: 'crimson',
            paddingVertical: 8,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 10,
          }}>
          <Text style={{color: '#fefefe', fontWeight: 'bold', fontSize: 18}}>
            {this.state.header} {this.state.username}
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={{color: 'white'}}>Click Me!</Text>
        </TouchableOpacity>
        <TextInput
          style={{borderWidth: 2}}
          onChangeText={valueText => this.setState({username: valueText})}
        />
        <Switch
          value={this.state.header == 'Home'}
          onValueChange={() => {
            this.setState({switchValue: !this.state.switchValue});

            const currentTitle = this.state.switchValue ? 'Header' : 'Home ';
            this.setState({header: currentTitle});
          }}
        />
      </View>
    );
  }

  testImage() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={{width: '20%', height: '20%'}}
          source={require('./src/image/image.jpeg')}
        />
        <TouchableOpacity
          style={{width: '20%', height: '20%'}}
          onPress={() => console.log('hello')}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: 'https://images.unsplash.com/photo-1556597249-cd6a997737df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=642&q=80',
            }}
          />
        </TouchableOpacity>
        <Image
          resizeMode="cover"
          style={{width: '100%', height: '20%'}}
          source={{
            uri: 'https://images.unsplash.com/photo-1550252225-69800809ba78?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
          }}
        />
        <Image
          resizeMode="contain"
          style={{width: '100%', height: '20%'}}
          source={{
            uri: 'https://images.unsplash.com/photo-1550252225-69800809ba78?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
          }}
        />
        <Image
          resizeMode="repeat"
          style={{width: '100%', height: '20%'}}
          source={{
            uri: 'https://images.unsplash.com/photo-1550252225-69800809ba78?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
          }}
        />
      </View>
    );
  }

  test1() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.textInput}>Hello World!</Text>
        <Text
          style={
            (styles.textInput,
            {
              fontWeight: '600',
            })
          }>
          Hello World!
        </Text>
        <Text
          style={
            (styles.textInput,
            {
              fontWeight: '800',
            })
          }>
          Hello World!
        </Text>
        <Text
          style={{
            color: 'rgba(222,020,033,1)',
            fontSize: 20,
            fontWeight: '100',
          }}>
          Hello World!
        </Text>
        <Text
          style={
            (styles.textInput,
            {
              fontWeight: 'bold',
            })
          }>
          Hello World!
        </Text>
        <Text style={{color: 'rgba(222,020,033,1)', fontSize: 20}}>
          Hello World!
        </Text>
        <Text
          style={
            (styles.textInput,
            {
              fontWeight: 'italic',
            })
          }>
          Hello World!
        </Text>
        <Text
          style={{
            color: 'rgba(222,020,033,1)',
            fontSize: 20,
            fontStyle: 'italic',
            textAlign: 'center',
          }}>
          Hello World!
        </Text>
        <Text
          style={{
            color: 'rgba(222,020,033,1)',
            fontSize: 20,
            fontStyle: 'italic',
            textAlign: 'center',
            textDecorationLine: 'line-through',
          }}>
          Hello World!
        </Text>
        <Text
          style={{
            color: 'rgba(222,020,033,1)',
            fontSize: 20,
            fontStyle: 'italic',
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}>
          Hello World!
        </Text>
        <Text
          style={{
            color: 'rgba(222,020,033,1)',
            fontSize: 20,
            fontStyle: 'italic',
            textAlign: 'center',
            textDecorationLine: 'underline',
            letterSpacing: 5,
          }}>
          Hello World!
        </Text>
        <Text
          style={{
            color: 'rgba(222,020,033,1)',
            fontSize: 20,
            fontStyle: 'italic',
            textAlign: 'center',
            textDecorationLine: 'underline',
            letterSpacing: 5,
          }}>
          Hello <Text style={{color: 'blue'}}>World!</Text>
        </Text>

        <View style={{flex: 1, backgroundColor: 'snow'}}>
          <View
            style={{
              flex: 1,
              width: '50%',
              height: '20%',
              backgroundColor: '#38c95c',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}>
            <Text style={{color: '#e0e0e0'}}>Awesome Text</Text>
          </View>

          <View
            style={{
              flex: 1,
              width: '50%',
              height: '20%',
              backgroundColor: '#88c998',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text style={{color: '#e0e0e0'}}>Awesome Text</Text>
          </View>

          <View
            style={{
              flex: 1,
              width: '50%',
              height: '20%',
              backgroundColor: '#ccc998',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#e0e0e0'}}>Awesome Text</Text>
          </View>
        </View>

        <View
          style={{
            flex: 0.5,
            backgroundColor: '#c0c9c8',
            margin: 10,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{color: '#e0e0e0'}}>Awesome Text</Text>
          <Text style={{color: '#e0e0e0'}}>Awesome Text 2 </Text>
        </View>
      </View>
    );
  }

  backAction = () => {
    Alert.alert('Hello', 'Mau Keluar?', [
      {
        text: 'cancel',
        onPress: () => console.log('ga jadi'),
        style: 'cancel',
      },
      {
        text: 'yakin cuy!',
        onPress: () => BackHandler.exitApp(),
        style: 'default',
      },
    ]);
    return true;
  };

  requestCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'cuy!',
          message: 'mau selfie skuy!',
          buttonPositive: 'Boleh lah!',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Say No!',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Mantap!');
      } else {
        console.log('Ga asik nih!');
      }
    } catch (err) {
      console.log(`error ${err.message}`);
    }
  };
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3f4f4c',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 10,
    elevation: 10,
  },
  textInput: {
    color: 'rgba(222,020,033,1)',
    fontSize: 20,
    fontWeight: '400',
  },
});

export default App;
