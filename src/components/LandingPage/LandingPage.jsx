import { Link } from "react-router-dom";
import style from './LandingPage.module.css'

function LandingPage() {
var title="Henry Video Games"
    return (

    <div className={style.container}>
        <div className={style.nav} data-text={title}>
                {title} 
        </div>
        <div className={style.main}>
            <div className={style.subtitleNav}>
                <h3 className={style.subtitle}>
                    The Super Games Site
                </h3>
            </div>
            <div className={style.enter}>
                <Link to='/home' className={style.enterButton}>Start!</Link>
            </div>
        </div>
      <div className={style.footer}>
          <h3>
              Technology Stack || ReactJs, Redux, Express, PostgreSQL, Sequelize
          </h3>
      </div>    
      {/**container end*/}
  </div>

    );
  }

export default LandingPage;