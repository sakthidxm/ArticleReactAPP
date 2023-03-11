import { useParams } from 'react-router-dom';
import articles from './article-content';
import PageNotFound from './PageNotFound';

const Article = () => {
    const { articleId } = useParams();
    const article = articles.find(article => article.name === articleId);

    if(!article){
       return ( <PageNotFound /> );
    }

    return (
        <>
        <h1>{article.title}</h1>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        </>
    );
}

export default Article;