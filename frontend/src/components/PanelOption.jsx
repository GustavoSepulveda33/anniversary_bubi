function PanelOption({ onOpen, children }) {
  return (
    <button type="button" className="panel-option" onClick={onOpen}>
      {children}
    </button>
  )
}

export default PanelOption
