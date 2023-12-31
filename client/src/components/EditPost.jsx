import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { json, useNavigate, useParams } from "react-router-dom"
import { URL } from './DataBase'

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],
        // ['link', 'image'],                  // text direction

        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
    ]
}

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    // const [postId, setPostId] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${URL}/post/${id}`)
            .then(resp => {
                resp.json().then(postInformation => {
                    setTitle(postInformation.title)
                    setSummary(postInformation.summary)
                    setContent(postInformation.content)

                })
            })
    }, [])

    const UpdatePost = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set('id', id);
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)

        const newData = await fetch( URL +'/post', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "title": title,
                'summary': summary,
                'content': content,
                'id': id
            }),
            credentials: 'include'
        })

        if (newData.status === 200) {
            navigate('/');
        } else {
            alert("Problem can not update post");
        }
    }

    //   if(response.status === 200) {
    //     navigate("/");
    //   } else {
    //     alert('Something went wrong');
    //   }
    // }

    return (
        <form action="" onSubmit={UpdatePost}>

            <input type="text"
                placeholder='Title'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <input
                type="Summary"
                placeholder='Summary'
                onChange={e => setSummary(e.target.value)}
                value={summary}
            />

            <input
                type="file"
                onChange={e => setFile(e.target.files)}
            />

            <ReactQuill
                modules={modules}
                value={content}
                onChange={newValue => setContent(newValue)}
            />

            <button type='submit' style={{ marginTop: '10px' }}>Update Post</button>

        </form>
    )
}


export default EditPost