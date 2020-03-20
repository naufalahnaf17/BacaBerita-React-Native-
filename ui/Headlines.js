import React, { Component } from 'react';
import {View,StyleSheet,FlatList,ImageBackground , TouchableOpacity} from 'react-native'
import {Text , Spinner } from 'native-base';
import axios from 'axios'

function TopArtikel({ title , urlImage , navigation , url }) {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('WebBerita' , {url : url})}>
            <View style={styles.topArtikelContainer}>
                <ImageBackground source={{ uri : urlImage }} style={styles.imBgTop}>
                    <View style={styles.blackOverlay}></View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}

function ArtikelLainnya({ title , urlImage , navigation , url }) {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('WebBerita' , {url : url})}>
            <View style={styles.lainnyaContainer}>
                <ImageBackground source={{ uri : urlImage }} style={styles.imBgTop}>
                    <View style={styles.lainnyaBlackOverlay}></View>
                    <View style={styles.textContainer}>
                        <Text style={styles.titleLainnya}>{title}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}

class HeadlinesContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            artikel : [],
            untukAnda : []
        }
    }

    componentDidMount(){
        this.setState({ artikel : this.props.topArticles , untukAnda : this.props.lainnyaArticles})
    }

    render(){
        return(
            <React.Fragment>
                <FlatList
                    ListHeaderComponent={
                        <View> 
                            <Text style={styles.titleUmum}>Top News</Text>   
                                <FlatList
                                    data={this.state.artikel}
                                    renderItem={({ item }) => <TopArtikel title={item.title} urlImage={item.urlToImage} navigation={this.props.navigation} url={item.url} />}
                                    keyExtractor={(item) => item.key}
                                    horizontal={true}
                                    windowSize={10}
                                    initialNumToRender={6}
                                /> 
                        </View>
                    }
                    ListEmptyComponent={
                        <View>
                            <Text style={styles.titleUmum}>Berita Untuk Anda</Text>
                            <View>
                                <FlatList
                                    data={this.state.untukAnda}
                                    renderItem={({ item }) => <ArtikelLainnya title={item.title} urlImage={item.urlToImage} navigation={this.props.navigation} url={item.url} />}
                                    keyExtractor={(item) => item.key}
                                    windowSize={10}
                                    initialNumToRender={6}
                                />
                            </View> 
                        </View>
                    }
                    ListFooterComponent={
                        <Text>Dibuat Oleh Naufal</Text>
                    }
                />     
            </React.Fragment>
        );
    }
}

export default class Headlines extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading : false,
            apiKey : 'cb840bd87bfc48b8985aec9daf0b6a13',
            country : 'id',
            topArticles : [],
            lainnyaArticles : []
        }
    }

    componentDidMount(){
        this._getTopArticles()
    }

    _getTopArticles(){
        var country = this.state.country
        var apiKey = this.state.apiKey
        
        axios({
                method : 'get',
                url : 'http://newsapi.org/v2/top-headlines?country='+country+'&apiKey='+apiKey+'&page=1',
            }).then((response) => {
                this.setState({ topArticles : response.data.articles })
                this._getLainnyaArticles()
            }).catch((error) => {
                alert('Ups Terjadi Kesalahan Saat Mengambil Data')
                this.setState({ isLoading : true })
        })
    }

    _getLainnyaArticles(){
        var country = this.state.country
        var apiKey = this.state.apiKey
        
        axios({
                method : 'get',
                url : 'http://newsapi.org/v2/top-headlines?country='+country+'&apiKey='+apiKey+'&page=2',
            }).then((response) => {
                this.setState({ isLoading : true , lainnyaArticles : response.data.articles })
            }).catch((error) => {
                alert('Ups Terjadi Kesalahan Saat Mengambil Data')
                this.setState({ isLoading : true })
        })
    }

    componentWillUnmount(){
        this.setState({ isLoading : false })
    }

    render() {
        const {isLoading,topArticles,lainnyaArticles} = this.state
        const {navigation} = this.props
        if(isLoading){
            return(
                <HeadlinesContent topArticles={topArticles} lainnyaArticles={lainnyaArticles} navigation={navigation} />
            );
        }else{
            return(
                <View style={styles.loading}>
                    <Spinner color="blue" />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({

    loading : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    topArtikelContainer : {
        width : 300 , height : 170 , padding : 5
    },
    imBgTop : {
        flex : 1 , height : 200
    },
    blackOverlay : {
        width : '100%' , height : 170 , backgroundColor: 'rgba(0,0,0,0.5)'
    },
    textContainer : {
        flex : 1 , justifyContent : 'flex-end' , alignItems : 'flex-end'
    },
    title : {
        color : 'white' , fontSize : 10 , padding : 10
    },
    lainnyaContainer : {
        flex : 1 , padding : 5
    },
    lainnyaBlackOverlay : {
        width : '100%' , height : '100%',backgroundColor: 'rgba(0,0,0,0.5)'
    },
    titleLainnya : {
        color : 'white' , fontSize : 14 , padding : 10 
    },
    titleUmum : {
        padding : 10 , fontWeight : 'bold'
    }

})