import React from 'react';
import '../style/components/NavbarCard.scss';

interface Props {
  children?: React.ReactNode;
  title: string;
  active: boolean;
  logo: string;
  logoActive: string;
  path: string;
}

const NavbarCard: React.FC<Props> = (props): JSX.Element => {
  const { title, active, logo, logoActive, path } = props;
  /** state **/

  /** effect **/

  /** methods **/
  const cardClick = () => {
    console.log(path);
  };

  /** render **/
  return (
    <div className={`navbar-card ${active ? 'navbar-card-active' : ''}`} onClick={cardClick}>
      {active ? (
        <img className={`navbar-card-logo`} src={logoActive} alt="" />
      ) : (
        <img className={`navbar-card-logo`} src={logo} alt="" />
      )}
      <div className={`navbar-card-title ${active ? 'navbar-card-title-active' : ''}`}>{title}</div>
    </div>
  );
};

export default NavbarCard;
