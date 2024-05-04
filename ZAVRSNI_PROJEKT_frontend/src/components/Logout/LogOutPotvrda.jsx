import './LogOutPotvrdaStyle.css'

const LogoutPotvrda = ({ isOpen, onClose, onConfirm }) => {
    return (
      <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modalContent">
          <span className="close" onClick={onClose}>&times;</span>
          <p className="modalMessage">Jeste li sigurni da se želite odjaviti?</p>
          <div className="modalActions">
            <button className="modalButton confirmButton" onClick={onConfirm}>Da</button>
            <button className="modalButton cancelButton" onClick={onClose}>Ne</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LogoutPotvrda;