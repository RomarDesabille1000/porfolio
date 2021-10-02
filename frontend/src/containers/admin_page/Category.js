import {NavLink} from "react-router-dom";
import Search from "../../components/Search";
import {Formik, useFormik} from "formik";
import * as Yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {create_category, get_category} from "../../redux/modules/_category";
import {useEffect} from "react";

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

    const state = useSelector(state => state.category)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_category())
    }, [])

    console.log(state)


    return(
        <div>
            <SubMenu/>
            <div id="content">
                <Search title="Category"/>
                <section id="projects">
                    {state.loading ? 'loading...': null}
                    {state.error ? 'Somethings wrong': null}
                    {
                        state.data.map((data, index) => {
                            return(
                                <div key={index} className="lists-admin">
                                    <ul className="post-list">
                                        <li className="post-item">
                                            <span className="link">
                                                {data.title}
                                            </span>
                                        </li>
                                    </ul>
                                    <div>
                                        <button style={{marginRight:10}}>Update</button>
                                        <button>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </section>
            </div>
        </div>
    )
}



//Create
export const CategoryCreate = () => {

    const initialValues = {
        category: '',
    }

    const state = useSelector(state => state.category)
    const dispatch = useDispatch()

    const onSubmit = (values) => {
        const f = new FormData()
        console.log(values)
        f.append('title', values.category)
        dispatch(create_category(f))
        console.log(values)
    }

    const validationSchema = Yup.object({
        category: Yup.string()
            .required('Category is required.')
            .max(100, 'Maximum of 100 characters is only allowed.')
    })

    return(
        <div>
            <SubMenu/>
            <div id="content">
                <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                >
                    {
                        (c) => (
                            <form className="form" onSubmit={c.handleSubmit}>
                                <div className="title">New Category</div>
                                {state.loading ? <div>Loading...</div> : null}
                                {state.success ? <div>Category has been successfully saved...</div> : null}
                                <div className="input">
                                    Category Name:
                                    <input type="text" name="category"
                                           onBlur={c.handleBlur}
                                           onChange={c.handleChange}
                                           value={c.values.category}/>
                                    {c.touched.category && c.errors.category ?
                                        <div className="input-error">{c.errors.category}</div> : null}
                                </div>
                                <div>
                                    <button type="submit" className="button">Confirm</button>
                                </div>
                            </form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}


