import "../../styles/components/modals/FailModal.css";
const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="fail-modal">
        <h2>Failed</h2>
        <p>{message}</p>
        <button onClick={onClose} className="modal-close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default FailModal;
