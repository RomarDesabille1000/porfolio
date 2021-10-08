import {Redirect, Route} from "react-router-dom";
import AdminNavbarLayout from "./AdminNavbarLayout";
import NavbarLayout from "./NavbarLayout";
import {useDispatch, useSelector} from "react-redux";
import {userData} from "../redux/modules/_auth";
import {useEffect} from "react";

//Customize Route
const CRoute = props => {
     const { component: RoutedComponent, layout, ...rest } = props;

    // render actual Route from react-router
    const actualRouteComponent = (
        <Route
            {...rest}
            render={(props) => (
                <RoutedComponent {...props} />
            )}
        />
    );
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userData())
    }, [])

    const isAuthenticated = () => {
        if(!authState.authenticated)
            return <Redirect to="/admin/"/>
    }

  // depends on the layout, you can wrap Route component in different layouts
    switch (layout) {
        case 'main_navbar': {
            return (
                <NavbarLayout>
                    {actualRouteComponent}
                </NavbarLayout>
            )
        }
        case 'admin_navbar': {
            return (
                <>
                    {isAuthenticated()}
                    <AdminNavbarLayout userData={authState.userData}>
                        {actualRouteComponent}
                    </AdminNavbarLayout>
                </>
            )
        }
        default: {
            return (
                <NavbarLayout>
                    {actualRouteComponent}
                </NavbarLayout>
            )
        }
    }
};

export default CRoute