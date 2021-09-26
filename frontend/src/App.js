import './App.css'
import Footer from './containers/main_page/Footer'
import Navbar from './components/main/Navbar'
import {ThemeProvider} from "styled-components";
import {useState} from "react";
import {lightTheme, darkTheme, GlobalStyles} from './components/Theme'

function App() {
    const [theme, setTheme] = useState({
        current:'dark',
        radioButton:'dark'
    });

    const onChangeThemeRadio = (e) => {
        setTheme({
            current: e.target.value, radioButton: e.target.value
        })
    }

    return (
        <ThemeProvider theme={theme.current === 'dark' ? darkTheme : lightTheme}>
            <GlobalStyles/>
            <div className="max-width mx-auto px3 ltr newClass">
                <div className="content index py4">
                    <Navbar changeTheme={onChangeThemeRadio} themeSelected={theme.radioButton} />
                    <Footer />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
