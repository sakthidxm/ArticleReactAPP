import { useParams } from 'react-router-dom';
import articles from './article-content';
import PageNotFound from './PageNotFound';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentList from '../components/ArticleComments';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';



const Article = () => {

    const [articleInfo, setArticleInfo] = useState({ upVotes: 0, comments: [] });
    const { articleId } = useParams();
    const { user, isLoading } = useUser()

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        loadArticleInfo();
        // setArticleInfo({upVotes:Math.ceil(Math.random()*10),comments:[]});
    }, []);

    const article = articles.find(article => article.name === articleId);

    const addUpVote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticleData = response.data;
        setArticleInfo(updatedArticleData);
    }



    if (!article) {
        return (<PageNotFound />);
    }

    return (
        <>
            <h1>{article.title}</h1>

            <div className="upvotes-section">

                {
                    user
                        ? <button onClick={addUpVote}>UPVOTE</button>
                        : <button>Login to UpVote</button>
                }
                <p>This artilce has  {articleInfo.vote} upVote(s) </p>
            </div>


            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}

            {
                user
                    ? <AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
                    : <button >Login to Comment</button>
            }
            <CommentList comments={articleInfo.comments} />

        </>
    );
}

export default Article;