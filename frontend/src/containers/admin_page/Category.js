import {NavLink} from "react-router-dom";
import Search from "../../components/Search";
import {useFormik} from "formik";
import * as Yup from 'yup'

const SubMenu = () => (
    <div id="header" className="sub-menu">
        <div id="nav">
            <ul>
                <li><NavLink exact to="/admin/category" activeClassName="active">Lists</NavLink></li>
                <li><NavLink exact to="/admin/category/create" activeClassName="active">Create</NavLink></li>
            </ul>
        </div>
    </div>
)
//Category Lists
export const Category = () => {

    return(
        <div>
            <SubMenu/>
            <div id="content">
                <Search title="Category"/>
                <section id="projects">
                    <div className="lists-admin">
                        <ul className="post-list">
                            <li className="post-item">
                                <span className="link">
                                    Hello World
                                </span>
                            </li>
                        </ul>
                        <div>
                            <button style={{marginRight:10}}>Update</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <div className="lists-admin">
                        <ul className="post-list">
                            <li className="post-item">
                                <span className="link">
                                    Hello World
                                </span>
                            </li>
                        </ul>
                        <div>
                            <button style={{marginRight:10}}>Update</button>
                            <button>Delete</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
//Create
export const CategoryCreate = () => {
    const validationSchema = Yup.object({
        category: Yup.string()
            .required('Category is required.')
            .max(100, 'Maximum of 100 characters is only allowed.')
    })
    const form = useFormik({
        initialValues: {
            category: '',
        },
        onSubmit: values => {
        },
        validationSchema
    })


    return(
        <div>
            <SubMenu/>
            <div id="content">
                <form className="form" onSubmit={form.handleSubmit}>
                    <div className="title">New Category</div>
                    <div className="input">
                        Category Name:
                        <input type="text" name="category"
                               onBlur={form.handleBlur}
                               onChange={form.handleChange}
                               value={form.values.category}/>
                        {form.touched.category && form.errors.category ?
                            <div className="input-error">{form.errors.category}</div> : null}
                    </div>
                    <div>
                        <button type="submit" className="button">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


