function PrevButton({ disable, onClick }) {
  return disable
    ? <button className="disabled_prev_next_button">&lt;</button>
    : <button className="prev_next_button" onClick={onClick}>&lt;</button>
}

export default PrevButton;
