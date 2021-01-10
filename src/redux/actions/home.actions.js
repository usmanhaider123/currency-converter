import * as ActionTypes from '../actionTypes'

export const setLoading = (data) => ({
    type: ActionTypes.SET_LOADING,
    payload: data,
});





export const changeBaseTheme = BaseTheme => ({
    type: "CHANGE_BASE_THEME",
    baseTheme: BaseTheme
});

export const changeColorTheme = ColorTheme => ({
    type: "CHANGE_COLOR_THEME",
    colorTheme: ColorTheme
});