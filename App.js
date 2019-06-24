import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CallDetectorManager from 'react-native-call-detection';
import { FlatList} from 'react-native';

export default class App extends React.Component() {
  constructor() {
    this.state = {
       phones: []
    };
    this.callDetectorManager = null;
  }
  componentWillMount()
  {
    this.callDetectorManager = new CallDetectorManager((event, phonenumber)=> {
        if (event === 'Incoming') {
          let phones = [{value:phonenumber, state: "Incoming"}, ...this.state.phones];
          this.setState("phones", phones);
        }
        if (event === 'Disconnected') {
          let phones = [{value:phonenumber, state: "Incoming"}, ...this.state.phones];
          this.setState("phones", phones);
        } 
      }, 
      true, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      ()=>{}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
      {
      title: 'Phone State Permission',
      message: 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.'
      } // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
    );
  }
  componentWillUnmount()
  {
    this.callDetectorManager && this.callDetectorManager.dispose();
  }
  _renderItem (item) {
    return (<View>
              <Text>
                {item.value} | {item.state}
              </Text>
            </View>);
  }
  render() {
    let {phones} = this.states;
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <FlatList data={phones} 
              renderItem={this._renderItem}
				      keyExtractor={(item, index) => index} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
