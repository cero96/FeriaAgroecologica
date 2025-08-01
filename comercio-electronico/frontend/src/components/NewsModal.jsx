// components/NewsModal.jsx
import React from 'react';
import NewsForm from './NewsForm';

const NewsModal = ({ show, onSubmit, onCancel }) => (
  <div className="modal fade" id="newsModal" tabIndex="-1" aria-labelledby="newsModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-primary fw-bold" id="newsModalLabel">Crear Historia</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div className="modal-body">
          {show && (
            <NewsForm onSubmit={onSubmit} onCancel={onCancel} />
          )}
        </div>
      </div>
    </div>
  </div>
);

export default NewsModal;
