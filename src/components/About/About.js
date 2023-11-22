import aboutPic from "../../images/aboutPic.svg";
import "./About.css";
const About = () => {
  return (
    <div className="about">
      {/* <SignUpPopup /> */}
      <div>
        <img className="about__image" src={aboutPic} alt="about"></img>
      </div>
      <div className="about__title-paragraph">
        <h2 className="about__title">About the author</h2>
        <p className="about__paragraph">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
          <br /> <br />
          You can also talk about your experience with Practicum, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </div>
  );
};

export default About;
