import aboutPic from "../../images/aboutPic.jpeg";
import "./About.css";
const About = () => {
  return (
    <section className="about">
      <img className="about__image" src={aboutPic} alt="about"></img>
      <div className="about__title-paragraph">
        <h2 className="about__title">About the author</h2>
        <div className="about__paragraph_container">
          <p className="about__paragraph">
            Ahmed Awad +3 years experience as a Software Engineer. Used MERN
            stack to for this project.
          </p>
          <p className="about__paragraph">
            Led teams building products generated +2 million dollars in revenue.
            Focuses on designing systems to solve complex problems.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
