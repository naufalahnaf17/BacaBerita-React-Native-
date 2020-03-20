import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default function WebBerita({ route , navigation }){
    const {url} = route.params
    return(
        <WebView 
            source={{ uri: url }} 
            javaScriptEnabled={true}
        />
    );
}