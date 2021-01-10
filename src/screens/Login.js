import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Image
} from 'react-native';

import * as Actions from '../redux/actions'
import { Images as LocalImages } from '../assets'
import { connect } from 'react-redux';
import styled, { ThemeProvider } from "styled-components";
import RNBootSplash from "react-native-bootsplash";




const Login = (props) => {
  const [username, updateUsername] = useState("")
  const [password, updatePassword] = useState("")
  const [isloading, updateloading] = useState(false)

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, [])

  const login = () => {
    const isValid = validate()
    if (isValid) {
      let user = props.user
      user.username = username
      user.password = password

      updateloading(true)
      setTimeout(() => {

        props.saveLoginState(user)
        props.getcurrencies()

        props.navigation.reset({
          routes: [{ name: 'Home' }]
        })
        updateloading(false)

      }, 500)
    }

  }

  const validate = () => {
    if (username == "" || password == "") {
      alert('Cannot leave any field empty')
      return false
    }
    return true
  }

  return (
    <ThemeProvider theme={props.theme}>
      <MainContainer>


        <Image
          source={LocalImages.logo}
          style={{ height: '30%', width: '40%', resizeMode: 'contain' }}
        />
        <Title>Login</Title>


        <Inputfield
          onChangeText={(text) => updateUsername(text)}
          value={username}
          placeholder={"Enter username"}
          placeholderTextColor={props.theme.PLACEHOLDER_LIGHT}


        />


        <Inputfield
          onChangeText={(text) => updatePassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder={"Enter password"}
          placeholderTextColor={props.theme.PLACEHOLDER_LIGHT}


        />

        <LoginButton
          onPress={login}
        >

          {
            isloading ? [
              <ActivityIndicator
                size={30}
                color={props.theme.PRIMARY_BACKGROUND_COLOR}
              />
            ] : [
                <LoginButtonText>Login</LoginButtonText>

              ]
          }
        </LoginButton>

      </MainContainer>
    </ThemeProvider>

  );
};

const MainContainer = styled.View`
  flex: 1;
  padding-top: 20%;
  align-items: center;
  background-color: ${props => props.theme.PRIMARY_BACKGROUND_COLOR};
`;

const Title = styled.Text`
  color: ${props => props.theme.PRIMARY_TEXT_COLOR};
  font-size: ${props => props.theme.FONT_SIZE_EXTRA_LARGE};
`;


const Inputfield = styled.TextInput`
height: 6.5%;
flex-direction: row;
align-items: center;
margin-top: 2%;
width: 90%;
background-color: ${props => props.theme.PRIMARY_TEXT_COLOR};
border-radius: 5;
margin-top: 5%;
padding-horizontal: 3%;
`

const InputLabel = styled.Text`
color: ${props => props.theme.PRIMARY_TEXT_COLOR};
`

const LoginButton = styled.TouchableOpacity`
    height: 6.5%;
    width: 40%;
    background-color: white;
    margin-top: 5%;
    border-radius: 5;
    align-items: center;
    justify-content: center;

`

const LoginButtonText = styled.Text`
  color: ${props => props.theme.PRIMARY_BACKGROUND_COLOR};
  font-size: ${props => props.theme.FONT_SIZE_LARGE};

`



const mapStateToProps = (state) => ({
  user: state.user.user,
  theme: state.home.theme
});

const mapDispatchToProps = dispatch => {
  return {
    saveLoginState: (params) => dispatch(Actions.updateLoginState(params)),
    getcurrencies: (params) => dispatch(Actions.getCurrencies(params)),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
