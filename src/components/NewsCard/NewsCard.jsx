// import cat from "../../images/cat.svg";
import "./NewsCard.css";
const NewsCard = ({
  source_name,
  title,
  publishedAt,
  description,
  urlToImage,
}) => {
  // to convert dates
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <div className="card">
      <img className="card__image" src={urlToImage} alt="card" />
      <div className="card__info">
        <h2 className="card__publish-date">{formatDate(publishedAt)}</h2>
        <p className="card__tilte">{title}</p>
        <p className="card__description">{description}</p>
        <p className="card__source">{source_name}</p>
      </div>
    </div>
  );
};

export default NewsCard;
