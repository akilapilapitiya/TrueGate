import '../../styles/components/modals/SuccessModal.css';


const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="success-modal">
        <h2>Success</h2>
        <p>{message}</p>
        <button onClick={onClose} className="modal-close-btn">Close</button>
      </div>
    </div>
  );
};

export default SuccessModal;
