import {NavLink} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select'
import Search from "../../components/Search";
import {Field, Formik, useField} from "formik";
import * as Yup from "yup";

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
    return(
        <div>
            <SubMenu/>
            <div id="content">
                <Search title="Posts"/>
                <section id="projects">
                    <div className="lists-admin">
                        <ul className="post-list">
                            <li className="post-item">
                                <div className="meta">
                                    <time dateTime="2016-11-14T16:49:32.000Z" itemProp="datePublished">14 Nov 2016</time>
                                </div>
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
                                <div className="meta">
                                    <time dateTime="2016-11-14T16:49:32.000Z" itemProp="datePublished">14 Nov 2016</time>
                                </div>
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

function SelectField(FieldProps) {
  return (
    <Select
      options={FieldProps.options}
      {...FieldProps.field}
      onChange={option => FieldProps.form.setFieldValue(FieldProps.field.name, option)}
    />
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
        thumbnail: '',
        status: 0,
        is_featured_project: false,
        is_featured_post: false,
    }

    const onSubmit = (values) => {
        console.log(values.body)
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
        category: Yup.array().min(1, 'Select at least 1 category.')
    })

    const options = [
      { value: '1', label: 'Chocolate' },
      { value: '2', label: 'Strawberry' },
      { value: '3', label: 'Vanilla' }
    ]

    const statusOptions = [
        {value:0, label:'Draft'},
        {value:1, label:'Published'},
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
                                    />
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


