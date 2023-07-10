import axios from "axios";
import { useState } from "react";

const AddCommentForm = ({articlesName,onArticleUpdated})=>{
    const [name,setName]=useState("");
    const [commentText,setCommentText]=useState("");

    const addComment=async() =>{
        const resp=await axios.post(`/api/articles/${articlesName}/comments`,{
            postedBy:name,
            text:commentText
        });   
        const updateArticle = resp.data;
        onArticleUpdated(updateArticle);
        setName("");
        setCommentText("");
    }
    
    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Name :
                <input value={name} 
                          onChange={e => setName(e.target.value)} 
                          type="text" />
            </label>

            <label>
                Comment:
                <textarea value={commentText} 
                               onChange={e=>setCommentText(e.target.value)} 
                               rows="4" cols="50" />
            </label>

            <button onClick={addComment}>Add Comment</button>


        </div>
    );
}


export default AddCommentForm;