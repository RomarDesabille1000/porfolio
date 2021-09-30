import {createGlobalStyle} from "styled-components";

export const lightTheme = {
    body: '#fff',
    fontColor: '#000',
    iconColor: '#000',
    link: '#000',
    postSelectBg: '#fff',
    postSelectColor: '#000',
}

export const darkTheme = {
    body: '#1D1F21',
    fontColor: '#C9CACC',
    iconColor: '#11AA8A',
    link: '#16AA8A',
    postSelectBg: '#1D1F21',
    postSelectColor: '#fff',
}

export const GlobalStyles = createGlobalStyle`
    body{
        background-color: ${props => props.theme.body};
        color: ${props => props.theme.fontColor};
    }
    i{
        color: ${props => props.theme.iconColor}
    }
    .link{
        color: ${props => props.theme.link}
    }
    .draft-js-style{
        color: ${props => props.theme.iconColor},
    }
    .css-b62m3t-container div{
        background-color: ${props => props.theme.postSelectBg};
        color: ${props => props.theme.postSelectColor};
    }
    .input select{
        background-color: ${props => props.theme.postSelectBg};
        color: ${props => props.theme.postSelectColor};
    }
`