import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
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
  padding-top: 5%;
  background-color: ${props => props.theme.SECONDARY_BACKGROUND_COLOR};
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

const RateText = styled.Text`
  color: ${props => props.theme.PRIMARY_TEXT_COLOR};
  font-size: ${props => props.theme.FONT_SIZE_SMALL}; 
  margin-top:5%;
`;

const RevCurrButton = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 5%;

`;

const RevCurrText = styled.Text`

   color: ${props => props.theme.PRIMARY_TEXT_COLOR};
`;

const DATA = [
  { id: 1, title: 'AUD' },

];


const Currencylist = (props) => {
  const [currencies, updateCurrencylist] = useState([])

  useEffect(() => {
    if (props.route.params != undefined) {

    }

    updateCurrencylist(props.currencies)
  }, [])



  const addtofav = (itemx) => {
    let curr = []
    curr = [...props.currencies]

    curr.map((item) => {
      if (itemx == Object.keys(item)[0]) {
        if (item.fav) {
          item.fav = false
        } else {
          item.fav = true
        }
      }
    })

    props.addtofav(curr)
    updateCurrencylist(curr)


  }

  const chooseCurrency = (itemx) => {
    if (props.route.params != undefined) {
      if (props.route.params.type == 'Base') {
        props.updateBase(itemx)
      } else {
        props.updateExchange(itemx)

      }

      props.navigation.goBack()
    }
  }

  const renderItem = ({ item }) => {
    let title = Object.keys(item)[0]
    return (
      <View style={{ paddingVertical: '1.5%', justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => chooseCurrency(item)}>
          <Text style={{ fontSize: 20 }}>{title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addtofav(title)}>
          {
            item.fav ? [
              <Icon name="heart-sharp" size={25} color="red" />
            ] : [
                <Icon name="heart-outline" size={25} color="gray" />
              ]
          }
        </TouchableOpacity>
      </View>)
  }



  return (
    <ThemeProvider theme={props.theme}>
      <MainContainer>
        <FlatList
          data={currencies}
          renderItem={renderItem}
          keyExtractor={item => Object.keys(item)}
          style={{ paddingHorizontal: '5%' }}
          extraData={currencies}
        />
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
  theme: state.home.theme,
  currencies: state.user.currencies
});

const mapDispatchToProps = dispatch => {
  return {
    setloading: (params) => dispatch(Actions.setLoading(params)),
    addtofav: (params) => dispatch(Actions.addtofav(params)),

    updateBase: (params) => dispatch(Actions.updateBase(params)),
    updateExchange: (params) => dispatch(Actions.updateExchange(params))

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Currencylist);
