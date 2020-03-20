import React from 'react'
import {Header,Body,Title} from 'native-base'

export default function CustomHeader(){
    return(
        <Header noShadow={true}>
            <Body>
                <Title>Baca Berita</Title>
            </Body>
        </Header>
    );
}