import {NavLink} from "react-router-dom";
import Search from "../../components/Search";
import {Formik, useFormik} from "formik";
import * as Yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {create_category, getCategory, deleteCategory} from "../../redux/modules/_category";
import {useEffect, useState} from "react";
import {Pagination} from "../../components/Pagination";
import Alert from "../../components/Alert";

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
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 2,
    })


    //---------------------DELETE CATEGORY-------------------------------------
    const [stateDeleteCategory, setSateDeleteCategory] = useState({
        id: null,
        delete: false
    })
    const handleOnClickDelete = (e) => {
        setSateDeleteCategory({id: e.target.id, delete: true})
    }
    const handleOnClickCancel = () => {
        setSateDeleteCategory({id: null, delete: false})
    }
    const handleOnClickConfirm = () => {
        let page = pagination.page
        if(state.data.results.length === 1 && state.data.next === null){
            //Go back to page 1
            page = 1
            setPagination({ ...pagination, page: 1 })
        }
        dispatch(deleteCategory(stateDeleteCategory.id, pagination.pageSize, page))
        setSateDeleteCategory({id: null, delete: false})
    }
    //---------------------DELETE CATEGORY-------------------------------------

    useEffect(() => {
        dispatch(getCategory(pagination.page, pagination.pageSize))
    }, [])


    return(
        <div>
            <SubMenu/>
            <div id="content">
                <Search title="Category"/>
                <section id="projects">
                    {
                        state.response ?
                            <Alert type={state.response['status']} message={state.response['message']}/> : ''
                    }
                    {state.loading.status ?
                        <div className="loading">
                            <div className="loader"/>
                            <div className="text-info">{state.loading.info}</div>
                        </div>
                        :
                        (
                            !state.data.results.length > 0 ? '' :
                                state.data.results.map((data, index) => {
                                    return(
                                        <div key={index}>
                                            <div className="lists-admin">
                                                <ul className="post-list">
                                                    <li className="post-item">
                                                        <span>ID: {data.id}</span>
                                                        &nbsp;
                                                        <span className="customized-text">{data.title}</span>
                                                    </li>
                                                </ul>
                                                <div>
                                                    <button className="update">Update</button>
                                                    <button
                                                        id={data.id}
                                                        onClick={handleOnClickDelete}
                                                        className="delete">Delete</button>
                                                </div>
                                            </div>
                                            {
                                                data.id === Number(stateDeleteCategory.id) && stateDeleteCategory.delete ?
                                                    <div className="option">
                                                        <div>Are you sure You want to delete this category of Id: {data.id} ?</div>
                                                        <div>
                                                            <button onClick={handleOnClickConfirm}
                                                                    className="confirm">Confirm</button>
                                                            <button
                                                                onClick={handleOnClickCancel}
                                                                className="update">Cancel</button>
                                                        </div>
                                                    </div> : null
                                            }
                                        </div>
                                    )
                                })
                        )
                    }
                    {
                        state.data.results.length > 0 ?
                            <Pagination data={state.data} dispatchFunc={getCategory}
                                        page={pagination} setPage={setPagination}/>
                            : ''
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


