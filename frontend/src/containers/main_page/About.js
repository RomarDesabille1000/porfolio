import React, {useState} from 'react'
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const About = () => {
    const [state, setState] = useState('')

    const onFileChange = (e) => {
        setState(e.target.files[0])
    }

    const handleS = (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('image', state, state.name)
        let URL = 'http://127.0.0.1:8000/api/blog/testupload/create'
        axios.post(URL, fd, {
          headers: {
            'accept': 'application/json',
            'Content-Type': `multipart/form-data`,
          }})
          .then((response) => {
            //handle success
              console.log('success')
          }).catch((error) => {
            //handle error
          });
    }

    const modules =  {
      toolbar: [
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean']
      ],
    }
    const [v, sV] = useState('')

    return(
        <div id="content">
            <p>
                Github: <a href="https://github.com/Rumiare">Rumire</a><br/>
                Facebook: <a href="https://www.facebook.com/IiIiIili/">Rogienald Philip Agol</a><br/>
                Youtube: <a href="https://www.youtube.com/channel/UCpnP38Wt8nkec03lLwGSHIw">Re:</a><br/>
            </p>
            <form onSubmit={handleS}>
                <input type="file" name="photo" onChange={onFileChange} />
                <button type="submit">OK</button>
            </form>
            Imgur Api
             <ReactQuill theme="snow"
                         modules={modules}
                         value={v} onChange={sV}
             />
        </div>

    )
}


export default About