import '../../styles/components/modals/DeleteConfirmModal.css';

const DeleteConfirmModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>⚠️ Confirm Deletion</h2>
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
        <div className="modal-actions">
          <button className="confirm-button" onClick={onConfirm}>Yes, Delete</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
