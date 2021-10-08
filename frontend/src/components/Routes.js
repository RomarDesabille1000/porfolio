import {Switch, Route} from 'react-router-dom'
import Home from "../containers/main_page/Home";
import About from "../containers/main_page/About";
import Blog from "../containers/main_page/Blog";
import Dashboard from "../containers/admin_page/Dashboard";
import {Category, CategoryCreate} from "../containers/admin_page/Category";
import {Post, PostCreate} from "../containers/admin_page/Posts";
import Login from "../containers/admin_page/Login";
import Logout from "../containers/admin_page/Logout";
import {Forbidden403, Page404, ServerDown} from "./ErrorPages";
import CRoute from "../hocs/CRoute";
import {useSelector} from "react-redux";

const Routes = ({changeTheme, themeSelected}) => {
        const authState = useSelector(state => state.auth)

        return (
            <Switch>
                    <CRoute exact path="/" component={() =>
                        <Home changeTheme={changeTheme} themeSelected={themeSelected}/>
                    }/>
                    <CRoute exact path="/about/" component={About}/>
                    <CRoute exact path="/blog/" component={Blog}/>


                {
                    !authState.authenticated ?
                        <Route exact path="/admin/" component={Login}/>
                        :
                        <CRoute exact path="/admin/" component={() =>
                            <Dashboard changeTheme={changeTheme} themeSelected={themeSelected}/>
                        }
                                layout="admin_navbar"
                        />
                }


                    <CRoute exact path="/admin/category/" component={Category} layout="admin_navbar"/>
                    <CRoute exact path="/admin/category/create/" component={CategoryCreate} layout="admin_navbar"/>
                    <CRoute exact path="/admin/post/" component={Post} layout="admin_navbar"/>
                    <CRoute exact path="/admin/post/create/" component={PostCreate} layout="admin_navbar"/>
                    <CRoute exact path="/admin/logout/" component={Logout} layout="admin_navbar"/>

                    {/*Error Pages*/}
                    <Route exact path="/forbidden/" component={Forbidden403} />
                <Route exact path="/server-down/" component={ServerDown} />
                    <Route component={Page404} />
            </Switch>
        )


}

export default Routes