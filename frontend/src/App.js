import './App.css'
import Footer from './components/Footer'
import Routes from './components/Routes'
import {ThemeProvider} from "styled-components";
import {useState} from "react";
import {lightTheme, darkTheme, GlobalStyles} from './components/Theme'

function App() {
    const [theme, setTheme] = useState({
        current: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark',
        radioButton: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark'
    });

    const onChangeThemeRadio = (e) => {
        if(e.target.value === 'dark')
            localStorage.setItem('theme', 'dark')
        else
            localStorage.setItem('theme', 'light')
        setTheme({
            current: e.target.value, radioButton: e.target.value
        })
    }

    return (
        <ThemeProvider theme={theme.current === 'dark' ? darkTheme : lightTheme}>
            <GlobalStyles/>
            <div className="max-width mx-auto px3 ltr newClass">
                <div className="content index py4">
                    <Routes changeTheme={onChangeThemeRadio}
                            themeSelected={theme.radioButton}/>
                    <Footer/>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
