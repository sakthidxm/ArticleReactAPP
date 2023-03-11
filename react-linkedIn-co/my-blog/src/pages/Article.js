import { useState,useEffect } from 'react';

import { useParams } from 'react-router-dom';
import articles from './article-content';
import PageNotFound from './PageNotFound';

const Article = () => {

    const [articleInfo,setArticleInfo]=useState({upvotes:0,comments:[]});
    useEffect(()=>{
        setArticleInfo({upvotes:3,comments:[]});
    });


    const { articleId } = useParams();
    const article = articles.find(article => article.name === articleId);

    if(!article){
       return ( <PageNotFound /> );
    }

    return (
        <>
        <h1>{article.title}</h1>
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        </>
    );
}

export default Article;