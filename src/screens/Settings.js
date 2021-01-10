import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Linking,
  FlatList,
  Text, Image
} from 'react-native';

import * as Actions from '../redux/actions'
import { Images as LocalImages } from '../assets'
import { connect } from 'react-redux';
import styled, { ThemeProvider } from "styled-components";
import Icon from 'react-native-vector-icons/Ionicons';




const MainContainer = styled.View`
  flex: 1;
`;


const ItemContainer = styled.TouchableOpacity`
    height: 6.5%;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background-color: white;
    padding-horizontal: 5%;
    border-bottom-width: 0.3px;
    border-bottom-color: lightgray;
  
   
`;





const ItemText = styled.Text`
   color: black;
`;


const RightItem = styled.View`
   position: absolute;
   right: 5%;
`;

const Settings = (props) => {
  const [externallink, setExternallink] = useState("https://fixer.io/")


  const openLink = () => {
    Linking.openURL(externallink).catch(err => alert('An error occurred', err));

  }
  const logout =()=>{
    props.navigation.reset({
      routes: [{ name: 'Login' }]
    })
  }
  
  return (
    <ThemeProvider theme={props.theme}>
      <MainContainer>
        <ItemContainer
          onPress={() => props.navigation.navigate('Themes')}

        >
          <ItemText>Themes</ItemText>

          <RightItem>

            <Icon
              name="chevron-forward" size={30} color={'lightgray'} />
          </RightItem>

        </ItemContainer>

        <ItemContainer
          onPress={openLink}
        >
          <ItemText>Fixer.io</ItemText>
          <RightItem>

            <Icon
              name="browsers-outline" size={30} color={'lightgray'} />
          </RightItem>

        </ItemContainer>


        <ItemContainer
          onPress={logout}

        >
          <ItemText>Logout</ItemText>
          <RightItem>

            <Icon
              name="arrow-undo-sharp" size={30} color={'lightgray'} />
          </RightItem>

        </ItemContainer>

      </MainContainer>
    </ThemeProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center', alignItems: 'center'
  }
});


const mapStateToProps = (state) => ({
  loading: state.home.loading,
  theme: state.home.theme
});

const mapDispatchToProps = dispatch => {
  return {
    setloading: (params) => dispatch(Actions.setLoading(params)),
    changeBaseTheme: (params) => dispatch(Actions.changeBaseTheme(params)),
    changeBaseColor: (params) => dispatch(Actions.changeColorTheme(params))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
