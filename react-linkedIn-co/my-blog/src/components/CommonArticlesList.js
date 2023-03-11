import { Link } from "react-router-dom";

const CommonArticlesList = ({articles}) => {
    return (
    <>
        
        
        {
            articles.map(art=>(
            <Link key={art.name} className="article-list-item" to={`/articles/${art.name}`}>
                <h3>{art.title}</h3>
                <p>{art.content[0].substring(0,150)}....</p>
            </Link>
            ))
        }        
    </>
    );
}

export default CommonArticlesList;