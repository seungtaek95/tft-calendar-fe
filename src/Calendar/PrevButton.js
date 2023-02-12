import './PrevButton.css';

function PrevButton({ onClick }) {
  return (
    <button className="prev_button" onClick={onClick}>&lt;</button>
  )
}

export default PrevButton;
