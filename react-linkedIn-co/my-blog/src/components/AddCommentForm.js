import axios from "axios";
import { useState } from "react";

const AddCommentForm = (articlesName)=>{
    const [name,setName]=useState("");
    const [commentText,setCommentText]=useState("");

    const addComment=async() =>{
        const resp=await axios.post(`/api/articles/{articlesName}/comments`);
        
    }
    
    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Name :
                <input value={name} onChange={e => setName(e.target.value)} type="text" />
            </label>

            <label>
                Comment:
                <textarea value={commentText} onChange={e=>setCommentText(e.target.value)} rows="4" cols="50" />
            </label>

            <button>Add Comment</button>


        </div>
    );
}