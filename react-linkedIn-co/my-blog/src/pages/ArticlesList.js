import articles from './article-content';
import CommonArticlesList from '../components/CommonArticlesList'

const ArticlesList = () => {
    return (
        <>
        <h1>ARTICLES LIST</h1>
        <CommonArticlesList articles = {articles} />
        </>
    );
}

export default ArticlesList;