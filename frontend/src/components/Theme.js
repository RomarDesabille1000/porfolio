import {createGlobalStyle} from "styled-components";

export const lightTheme = {
    body: '#fff',
    fontColor: '#000',
    iconColor: '#000',
    link: '#000',
}

export const darkTheme = {
    body: '#1D1F21',
    fontColor: '#C9CACC',
    iconColor: '#11AA8A',
    link: '#16AA8A',
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
`