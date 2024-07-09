import { Image } from "react-bootstrap";
import logo_2023 from "../../assets/logo/banners/2024.png";
import logo_coirp from "../../assets/logo/banners/coirp.png";
import logo_edu_portal from "../../assets/logo/banners/edu_portal.png";
import logo_inf_portal from "../../assets/logo/banners/inf_portal.png";
import logo_oot from "../../assets/logo/banners/oot.png";
import logo_svk from "../../assets/logo/banners/svk.png";

const Banners = () => {
  const arrBanners = [
    { logo: logo_coirp, link: "http://lotus.asb.by/asbcoirp/" },
    { logo: logo_edu_portal, link: "https://asuo.belarusbank.by/mira/" },
    { logo: logo_inf_portal, link: "http://lotus.asb.by/asbbook/" },
    { logo: logo_oot, link: "http://lotus.asb.by/asbot.nsf" },
    { logo: logo_svk, link: "http://lotus.asb.by/asbsvk/index.php" },
    { logo: logo_2023, link: "http://info.asb.by/index.php?key=43906" },
  ];

  return arrBanners.map((source, idx) => {
    return (
      <a
        href={source.link}
        className="footer_asb_inform"
        target="_blank"
        rel="noreferrer"
        key={idx}
      >
        <Image
          className="rightSidePanel_banners_photo"
          fluid
          src={source.logo}
        />
      </a>
    );
  });
};

export default Banners;
