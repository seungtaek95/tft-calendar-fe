import './NextButton.css';

function NextButton({ onClick }) {
  return (
    <button className="next_button" onClick={onClick}>&gt;</button>
  )
}

export default NextButton;
