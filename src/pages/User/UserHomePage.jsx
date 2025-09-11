import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";  // import arrow icon
import "./UserHomePage.css";
import borrowBookImg from "../../assets/w4.jpg";
import returnBookImg from "../../assets/w2.jpg";
import borrowedHistoryImg from "../../assets/w3.jpg";
// import "../../components/Sidebar";

// import Sidebar from "./Sidebar";

const UserHomePage = () => {
  const navigate = useNavigate();
const cards = [
  {
    id: 1,
    title: "Books",
    desc: "Books available in the library.",
    img: borrowBookImg,
    path: "/borrow-books",
  },
  {
    id: 2,
    title: "Return Shelf",
    desc: "Return books you have borrowed.",
    img: returnBookImg,
    path: "/return-book",
  },
  {
    id: 3,
    title: "Issued Books",
    desc: "Borrowed books history.",
    img: borrowedHistoryImg,
    path: "/borrowed-history",
  },
];


  return (
    <div className="uhp-container">
      <h1 className="uhp-title"> Welcome to Library</h1>

      <div className="uhp-cards-container">
        {cards.map((card) => (
          <div
            className="uhp-card"
            key={card.id}
            onClick={() => navigate(card.path)}
          >
            <img src={card.img} alt={card.title} className="uhp-card-img" />

            <div className="uhp-card-overlay">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>

              {/* Arrow instead of button */}
              <span className="uhp-card-arrow">
                <FaArrowRight />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHomePage;
