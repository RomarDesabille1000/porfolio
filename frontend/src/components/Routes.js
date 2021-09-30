import {Switch, Route} from 'react-router-dom'
import Home from "../containers/main_page/Home";
import NavbarType from "../hocs/NavbarType";
import About from "../containers/main_page/About";
import Blog from "../containers/main_page/Blog";
import Dashboard from "../containers/admin_page/Dashboard";
import {Category, CategoryCreate} from "../containers/admin_page/Category";
import {Post, PostCreate} from "../containers/admin_page/Posts";
import Page404 from "./Page404";

const Routes = ({changeTheme, themeSelected}) => {
    return (
        <Switch>
            {/*
                Routes For main NavigationBar
                Check hocs/NavbarLayout.js for the Layout
            */}
            <Route exact path="/"
                   component={
                       NavbarType(props =>
                       <Home {...props}
                           changeTheme={changeTheme}
                             themeSelected={themeSelected}
                       />, '')}
            />
            <Route exact path="/about" component={NavbarType(About)}/>
            <Route exact path="/blog" component={NavbarType(Blog)}/>
            {/*
                Routes For Admin NavigationBar
                Check hocs/AdminNavbarLayout.js for the Layout
            */}
            <Route exact path="/admin"
                component={
                    NavbarType(props =>
                    <Dashboard {...props}
                    changeTheme={changeTheme}
                    themeSelected={themeSelected}
                    />, 'admin')}
                />
                , 'admin')}/>
            <Route exact path="/admin/category" component={NavbarType(Category, 'admin')}/>
            <Route exact path="/admin/category/create" component={NavbarType(CategoryCreate, 'admin')}/>
            <Route exact path="/admin/post" component={NavbarType(Post, 'admin')}/>
            <Route exact path="/admin/post/create" component={NavbarType(PostCreate, 'admin')}/>


            <Route component={Page404} />
        </Switch>
    )
}

export default Routes