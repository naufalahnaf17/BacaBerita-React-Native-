import React,{Fragment, Component} from 'react'
import { View , Text , StyleSheet , FlatList , TouchableOpacity , ImageBackground } from 'react-native'
import {Spinner} from 'native-base'
import axios from 'axios'

function ArtikelSports({title , urlImage , navigation , url}){
    return(
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

class SportsContent extends Component{

    constructor(props){
        super(props);
        this.state = {
            artikel : []
        }
    }

    componentDidMount(){
        this.setState({ artikel : this.props.topArticles })
    }

    render(){
        const {artikel} = this.state
        return(
            <FlatList 
                data={artikel}
                renderItem={({ item }) => <ArtikelSports title={item.title} urlImage={item.urlToImage} url={item.url} navigation={this.props.navigation} /> }
                keyExtractor={(item) => item.key}
                windowSize={10}
                initialNumToRender={6}
            />
        );
    }
}

export default class Sports extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading : false,
            apiKey : 'cb840bd87bfc48b8985aec9daf0b6a13',
            country : 'id',
            topArticles : []
        }
    }

    async componentDidMount(){
        setTimeout(() => {
            this._getTopArticles()
        },3000)
    }

    _getTopArticles(){
        var country = this.state.country
        var apiKey = this.state.apiKey
        
        axios({
                method : 'get',
                url : 'http://newsapi.org/v2/top-headlines?country='+country+'&category=sports&apiKey='+apiKey,
            }).then((response) => {
                this.setState({ isLoading : true , topArticles : response.data.articles })
            }).catch((error) => {
                alert('Ups Terjadi Kesalahan Saat Mengambil Data')
                this.setState({ isLoading : true })
        })
    }

    render(){
        const {isLoading,topArticles} = this.state
        if(isLoading){
            return(
                <Fragment>
                    <SportsContent topArticles={topArticles} navigation={this.props.navigation} />
                </Fragment>
            );
        }else{
            return(
                <Fragment>
                    <View style={styles.loading}>
                        <Spinner color="blue" />
                    </View>
                </Fragment>
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
    imBgTop : {
        flex : 1 , height : 200
    },
    textContainer : {
        flex : 1 , justifyContent : 'flex-end' , alignItems : 'flex-end'
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