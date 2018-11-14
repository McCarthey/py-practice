import React, {Component} from 'react'
import {Text, View, Image} from 'react-native'

export default class HelloWorldApp extends Component {
	render() {
		let pic = {
			uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
		}
        return (
            <View>
				<Text> Hello world! </Text>
				<Image source={pic} style={{width: 193, height: 100}}/>
            </View>
        )
    }
}
