import React, { useEffect, useState } from 'react';
import {
  Text, Image,
} from 'react-native';

import * as Actions from '../redux/actions'
import { Images as LocalImages } from '../assets'
import { connect } from 'react-redux';
import styled, { ThemeProvider } from "styled-components";
import Icon from 'react-native-vector-icons/Ionicons';


const Home = (props) => {
  const [singleRate, updateSingleRate] = useState(0)
  const [exchangeRate, updateExchangeRate] = useState("")
  const [baseRate, updateBaseRate] = useState("")

  useEffect(() => {
    updateSingleRate(convertCurrency(1))
  }, [])

  const convertCurrency = (input) => {
    let firstrate = parseFloat(Object.values(props.baseCurr)[0])
    let secondrate = parseFloat(Object.values(props.exchangeCurr)[0])

    let result =  parseFloat(parseFloat(parseFloat(input) * secondrate) / firstrate).toFixed(2)
  
    if(isNaN(result))
      {return ""}
    else{
      return result
    }
  }

  const exchangeCurrencies = () => {
      let data = {
        base: props.exchangeCurr,
        exchange: props.baseCurr
      }    
      props.exchangeCurrencies(data)
      updateBaseRate(exchangeRate)
      updateExchangeRate(baseRate)
  }





  return (
    <ThemeProvider theme={props.theme}>
      <MainContainer>
        <SettingsIconView>
          <Icon
            onPress={() => props.navigation.navigate('Settings')}
            name="settings" size={30} color={props.theme.PRIMARY_TEXT_COLOR} />

        </SettingsIconView>

        <Image
          source={LocalImages.logo}
          style={{ height: '30%', width: '40%', resizeMode: 'contain' }}
        />
        <Title>Currency Converter</Title>

        <ItemContainer>
          <CurrencyPickerButton onPress={() => { props.navigation.navigate('Currencylist', { type: 'Base' }) }}>
            <Text style={{ color: props.theme.PRIMARY_BACKGROUND_COLOR }}>{Object.keys(props.baseCurr)[0]}</Text>
          </CurrencyPickerButton>
          <CurrencyInput
            onChangeText={(text) => {updateExchangeRate(convertCurrency(text))
              updateBaseRate(text)
            }}
            keyboardType={"number-pad"} 
            value={baseRate}
            placeholder="Enter currency"
            placeholderTextColor={props.theme.PLACEHOLDER_LIGHT}
            
            />
        </ItemContainer>


        <ItemContainer>
          <CurrencyPickerButton onPress={() => { props.navigation.navigate('Currencylist', { type: 'Exchange' }) }}>
            <Text style={{ color: props.theme.PRIMARY_BACKGROUND_COLOR }}>{Object.keys(props.exchangeCurr)[0]}</Text>
          </CurrencyPickerButton>

          <ExchangedText>{exchangeRate}</ExchangedText>
        </ItemContainer>

        <RateText>1 {Object.keys(props.baseCurr)[0]} = {singleRate} {Object.keys(props.exchangeCurr)[0]}</RateText>

        <RevCurrButton onPress={() => exchangeCurrencies()}>
          <Icon name="md-sync" size={30} color={props.theme.PRIMARY_TEXT_COLOR} />
          <RevCurrText>Reverse Currencies</RevCurrText>
        </RevCurrButton>


      </MainContainer>
    </ThemeProvider>

  );
};





const MainContainer = styled.View`
  flex: 1;
  padding-top: 10%;
  align-items: center;
  background-color: ${props => props.theme.PRIMARY_BACKGROUND_COLOR};
`;

const Title = styled.Text`
  color: ${props => props.theme.PRIMARY_TEXT_COLOR};
  font-size: ${props => props.theme.FONT_SIZE_EXTRA_LARGE};
`;

const ItemContainer = styled.View`
    height: 6.5%;
    flex-direction: row;
    align-items: center;
    margin-top: 2%;
    width: 90%;
    background-color: ${props => props.theme.PRIMARY_TEXT_COLOR};
    border-radius: 5;
    margin-top: 5%
`;

const CurrencyPickerButton = styled.TouchableOpacity`
    width: 20%; 
    height: 100%;
    justifyContent: center 
    alignItems: center;
    borderRightWidth: 1;
    borderRightColor: gray
`;

const CurrencyInput = styled.TextInput`
    width: 80%; 
    height: 100%;
    padding-horizontal: 10px;
    
`;

const RateText = styled.Text`
  color: ${props => props.theme.PRIMARY_TEXT_COLOR};
  font-size: ${props => props.theme.FONT_SIZE_SMALL}; 
  margin-top:5%;
`;

const RevCurrButton = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 5%;
  align-items: center;

`;

const RevCurrText = styled.Text`
   color: ${props => props.theme.PRIMARY_TEXT_COLOR};
`;

const ExchangedText = styled.Text`
   color: black;
   margin-left: 10px;
`;
const SettingsIconView = styled.View`
    width:100%;
    height:5%;
    align-items: flex-end;
    padding-horizontal:5%;

`

const mapStateToProps = (state) => ({
  loading: state.home.loading,
  theme: state.home.theme,
  baseCurr: state.user.baseCurrency,
  exchangeCurr: state.user.exchangeCurrency,

});

const mapDispatchToProps = dispatch => {
  return {
    exchangeCurrencies: (params) => dispatch(Actions.reverseCurrencies(params)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
