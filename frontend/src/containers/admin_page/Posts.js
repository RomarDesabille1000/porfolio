import {NavLink} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select'
import Search from "../../components/Search";
import {Field, Formik, useField} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {createPost, getPost} from "../../redux/modules/_post";
import {useEffect, useRef, useState} from "react";
import {Pagination} from "../../components/Pagination";
import Alert from "../../components/Alert";

const SubMenu = () => (
    <div id="header" className="sub-menu">
        <div id="nav">
            <ul>
                <li><NavLink exact to="/admin/post" activeClassName="active">Post</NavLink></li>
                <li><NavLink exact to="/admin/post/create" activeClassName="active">Create</NavLink></li>
            </ul>
        </div>
    </div>
)

//Multiple Select
export function MultipleSelectField(props) {
    const [field, state, { setValue, setTouched }] = useField(props.field.name);

    // value is an array now
    const onChange = (value) => {
        setValue(value);
    };

    // use value to make this a  controlled component
    // now when the form receives a value for 'campfeatures' it will populate as expected
    return <Select {...props} value={state?.value} isMulti onChange={onChange} onBlur={setTouched} />;
}

//Post Lists
export const Post = () => {
    const state = useSelector(state => state.post)
    const dispatch = useDispatch()
    const [deletePost, setDeletePost] = useState({
        id: null,
        delete: false
    })
    const noOfPostToDisplay = 4

    useEffect(() => {
        dispatch(getPost(1, noOfPostToDisplay))
    }, [dispatch])

    const formatDate = (date) => {
        const d = date.split('-')
        return `${d[2]}/${d[1]}/${d[0]}`
    }

    const backgroundColors = ['#CCE5FF', '#D4EDDA', '#E2E3E5', '#F8D7DA', '#FFF3CD', '#D1ECF1']

    const handleOnClickDelete = (e) => {
        setDeletePost({id: e.target.id, delete: true})
    }
    const handleOnClickCancel = (e) => {
        setDeletePost({id: null, delete: false})
    }

    return(
        <div>
            <SubMenu/>
            <div id="content">
                <Search title="Posts"/>
                <section id="projects">
                    {state.loading ? <Alert type="info" message="Getting the data..."/> : null}
                    {state.error ?
                        <Alert type="error" message="Theres an error with the server please try to refresh your browser."/>
                        : null}
                    {
                        state.data.results.map((data, index) => {
                            return (
                                <div key={index}>
                                    <div className="lists-admin">
                                        <ul className="post-list">
                                            <li key={index} className="post-item">
                                            <span className="link">
                                                {data.title}
                                            </span>
                                                <span className="date">
                                                &nbsp;Created: {formatDate(data.created_on)}
                                            </span>
                                            </li>
                                            <span>Categories: </span>
                                            {
                                                data.category.map((c, i) => {
                                                    return(
                                                        <span key={i} className="post-category"
                                                              style={{backgroundColor: backgroundColors[Math.floor(Math.random() * backgroundColors.length)]}}>{c.title}</span>
                                                    )
                                                })
                                            }
                                        </ul>
                                        <div className="d-flex" style={{flexDirection:'column'}}>
                                            <button className="confirm">Update</button>
                                            <button id={data.id} onClick={handleOnClickDelete}
                                                    style={{marginTop: 10}} className="cancel">
                                                Delete</button>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            data.id === Number(deletePost.id) && deletePost.delete ?
                                                <div className="d-flex" style={{justifyContent:'space-between'}}>
                                                    <div>Are you sure You want to delete this post?</div>
                                                    <div>
                                                        <button className="confirm">Confirm</button>
                                                        <button onClick={handleOnClickCancel} className="cancel">Cancel</button>
                                                    </div>
                                                </div> : null
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <Pagination data={state.data} dispatchFunction={getPost} pageItems={noOfPostToDisplay}/>
                </section>
            </div>
        </div>
    )
}


//Create
export const PostCreate = () => {

    //React Quill Modules
    const modules =  {
        toolbar: [
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
    }

    const initialValues = {
        title: '',
        slug: '',
        body: '',
        category: [],
        thumbnail: null,
        status: 0,
        is_featured_project: false,
        is_featured_post: false,
    }

    const state = useSelector(state => state.post)
    const dispatch = useDispatch()
    const thumbnailInputRef = useRef()

    const onSubmit = (values, {setFieldValue, resetForm}) => {
        let categorySelected = values.category.map(v => v.value)
        const f = new FormData()
        f.append('title', values.title)
        f.append('slug', values.slug)
        f.append('body', values.body)
        f.append('category_ids', categorySelected)
        if(values.thumbnail !== null){
            f.append('thumbnail', values.thumbnail, values.thumbnail.name)
        }
        f.append('status', values.status)
        f.append('is_featured_project', values.is_featured_project)
        f.append('is_featured_post', values.is_featured_post)
        dispatch(createPost(f))
        //reset form inputs
        thumbnailInputRef.current.value = null
        resetForm()
    }

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Title is required.')
            .max(200, 'Maximum of 200 characters is only allowed.'),
        slug: Yup.string()
            .required('Slug is required.')
            .max(200, 'Maximum of 200 characters is only allowed.'),
        body: Yup.string()
            .required('Body is required.'),
        category: Yup.array().min(1, 'Select at least 1 category.'),
        thumbnail: Yup.mixed().nullable().notRequired().test('fileFormat', 'Unsupported file type.',(file) => {
            const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']
            return (file === null || file === undefined || SUPPORTED_FORMATS.includes(file.type))
        })
    })

    const options = [
      { value: '3', label: 'Chocolate' },
      { value: '4', label: 'Strawberry' },
      { value: '5', label: 'Vanilla' }
    ]

    return(
        <div>
            <SubMenu/>
            <div id="content">
                <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                >
                    {
                        (p) => (
                            <form className="form" onSubmit={p.handleSubmit}>
                                <div className="title">New Post</div>
                                {state.loading ? <Alert type="info" message="Saving..."/> : null}
                                {state.success ? <Alert type="success" message="Data has been successful saved."/> : null}
                                {state.error ? <Alert type="error" message="Theres an error with the server please try to refresh your browser."/>: null}
                                <div className="input">
                                    Title
                                    <input type="text" name="title"
                                           onChange={p.handleChange}
                                           onBlur={p.handleBlur}
                                           value={p.values.title}
                                    />
                                    {p.touched.title && p.errors.title ?
                                        <div className="input-error">{p.errors.title}</div> : null}
                                </div>
                                <div className="input">
                                    Slug
                                    <input type="text" name="slug"
                                           onChange={p.handleChange}
                                           onBlur={p.handleBlur}
                                           value={p.values.slug}
                                    />
                                    {p.touched.slug && p.errors.slug ?
                                        <div className="input-error">{p.errors.slug}</div> : null}
                                </div>
                                <div className="input">
                                    Body
                                    <Field name="body">
                                        {({ field }) =>
                                            <ReactQuill value={field.value}
                                                        modules={modules}
                                                        onBlur={field.handleBlur}
                                                        onChange={field.onChange(field.name)}/>
                                        }
                                    </Field>
                                    {p.touched.body && p.errors.body ?
                                        (<div className="input-error">{p.errors.body}</div>) : null}
                                </div>
                                <div className="input">
                                    Category
                                    <Field component={MultipleSelectField}
                                           name="category"
                                           options={options}
                                    />
                                    {p.touched.category && p.errors.category ?
                                        (<div className="input-error">{p.errors.category}</div>) : null}
                                </div>
                                <div className="input">
                                    <div>Status</div>
                                    <Field as="select" name="status">
                                        <option value="0">Draft</option>
                                        <option value="1">Status</option>
                                    </Field>
                                </div>
                                <div className="input">
                                    Thumbnail (Optional)
                                    <input style={{border:'1px solid #fff'}}
                                           type="file"
                                           ref={thumbnailInputRef}
                                           name="thumbnail"
                                           onBlur={p.handleBlur}
                                           onChange={e => {
                                               if(e.target.value !== ''){
                                                   p.setFieldValue("thumbnail", e.currentTarget.files[0])
                                               }else{
                                                   p.setFieldValue("thumbnail", null)
                                               }
                                           }}
                                    />
                                    {p.touched.thumbnail && p.errors.thumbnail ?
                                        (<div className="input-error">{p.errors.thumbnail}</div>) : null}
                                </div>
                                <div className="post-checkbox input">
                                    <div style={{display:"flex",alignItems:"center",marginRight:15}}>
                                        Feature Post
                                        <Field style={{width:"unset"}}
                                               type="checkbox"
                                               name="is_featured_post"
                                        />
                                    </div>
                                    <div style={{display:"flex",alignItems:"center"}}>
                                        Feature Project
                                        <Field style={{width:"unset"}}
                                               type="checkbox"
                                               name="is_featured_project"
                                        />
                                    </div>
                                </div>
                                <div>
                                    {state.loading ?
                                        <button className="button" disabled>Loading....</button>
                                        :
                                        <button  type="submit" className="button">
                                            Confirm</button>
                                    }
                                </div>
                            </form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}


