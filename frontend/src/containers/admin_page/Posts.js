import {NavLink} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select'
import Search from "../../components/Search";
import {Field, Formik, useField} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {create_post, get_post} from "../../redux/modules/_post";
import {useEffect} from "react";

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


//Post Lists
export const Post = () => {
    const state = useSelector(state => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_post())
    }, [])

    console.log(state)

    return(
        <div>
            <SubMenu/>
            <div id="content">
                <Search title="Posts"/>
                <section id="projects">
                    {state.loading ? 'loading...': null}
                    {state.error ? 'Somethings wrong': null}
                    {
                        state.data.map((data, index) => {
                            return (
                                <div key={index} className="lists-admin">
                                    <ul className="post-list">
                                        <li className="post-item">
                                            <div className="meta">
                                                <time dateTime={data.created_on} itemProp="datePublished">{data.created_on}</time>
                                            </div>
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
        thumbnail: '',
        status: 0,
        is_featured_project: false,
        is_featured_post: false,
    }

    const state = useSelector(state => state.post)
    const dispatch = useDispatch()

    const onSubmit = (values) => {
        let categorySelected = values.category.map(v => v.value)
        console.log(values)
        const f = new FormData()
        f.append('title', values.title)
        f.append('slug', values.slug)
        f.append('body', values.body)
        f.append('category_ids', categorySelected)
        f.append('thumbnail', values.thumbnail, values.thumbnail.name)
        f.append('status', values.status)
        f.append('is_featured_project', values.is_featured_project)
        f.append('is_featured_post', values.is_featured_post)
        dispatch(create_post(f))
        console.log(values)
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
        thumbnail: Yup.mixed().test('fileFormat', 'Unsupported file type', (value) => {
            if(value !== undefined){
                return (value.type === 'image/jpeg' || value.type === 'image/png')
            }
          }
        )
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
                                {state.loading ? <div>Loading...</div> : null}
                                {state.success ? <div>Data has been successfully saved...</div> : null}
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
                                           name="thumbnail"
                                           onChange={(event) => {
                                               p.setFieldValue("thumbnail", event.currentTarget.files[0]);
                                           }}
                                    />
                                    {p.errors.thumbnail ?
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
                                {
                                    state.error ? <div className="input-error">Somethings wrong with your data.</div>
                                        : null
                                }
                                <div>
                                    {state.loading ?
                                        <button className="button" disabled>Loading....</button>
                                        :
                                        <button type="submit" className="button">
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


