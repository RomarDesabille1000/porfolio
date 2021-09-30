
const Dashboard = ({ changeTheme, themeSelected }) => {

    return(
        <div id="content">
            <div style={{marginTop:65, marginBottom:10}}>
                Choose your Theme
            </div>
            <div style={{marginBottom:10}}>
                <span>
                    <input type="radio"
                           value="dark"
                           checked={themeSelected === 'dark'}
                           onChange={changeTheme}
                           />
                           &nbsp;
                           <label>Dark Mode</label>
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                    <input
                        type="radio"
                        value="light"
                        checked={themeSelected === 'light'}
                        onChange={changeTheme}
                        />
                        &nbsp;
                        <label>Light Mode</label>
                </span>
            </div>
            Hello! John Doe
        </div>
    )
}


export default Dashboard