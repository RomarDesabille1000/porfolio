import NavbarLayout from "./NavbarLayout";
import AdminNavbarLayout from "./AdminNavbarLayout";

const NavbarType = (Component, navigationType) => {
    //Check Argument in Router
    const check = () => {
        switch (navigationType){
            case 'main':
                return true;
            case 'admin':
                return false;
            default:
                return true
        }
    }

    return (props) => (
        <div>
            {
                check() ?
                    <NavbarLayout>
                        <Component {...props}/>
                    </NavbarLayout>
                    :
                    <AdminNavbarLayout>
                        <Component {...props}/>
                    </AdminNavbarLayout>
            }
        </div>
    )
}



export default NavbarType