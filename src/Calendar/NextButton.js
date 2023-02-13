function NextButton({ disable, onClick }) {
  return disable
    ? <button className="disabled_prev_next_button">&gt;</button>
    : <button className="prev_next_button" onClick={onClick}>&gt;</button>
}

export default NextButton;
