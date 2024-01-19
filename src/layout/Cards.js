import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './Cards.css';

function Cards({ posts, handleDelete }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  const openConfirmation = (id) => {
    console.log('Excluir post ID:', id);
    setTaskIdToDelete(id);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setTaskIdToDelete(null);
    setShowConfirmation(false);
  };

  const confirmDelete = async () => {
  try {
    if (taskIdToDelete !== null) {
      await handleDelete(taskIdToDelete);
      closeConfirmation();
    }
  } catch (error) {
    console.error('Erro ao excluir post:', error);
  }
};

  return (
    <div className='row'>
      {posts.map((post) => (
        <div className='col-sm-4' key={post.id}>
          <div className='card mb-3'>
            <img
              src={`http://localhost:3001/images/${post.foto}`}
              className='card-img-top'
              alt='foto'
            />
            <div className='card-body'>
              <h5 className='card-title'>{post.nome}</h5>
              <p className='card-text'>
                <i className="bi bi-chat-dots"></i> {post.descricao}
              </p>
            </div>
            <div className='card-footer text-muted'>
              <Link to={`/${post.id}`} className='btn btn-primary'>
                <i className="bi bi-wrench"></i> Editar
              </Link>
              <button
                className='btn btn-secondary mx-2'
                onClick={() => openConfirmation(post.id)}
              >
                <i className="bi bi-trash-fill"></i> Excluir
              </button>
            </div>
          </div>
        </div>
      ))}

      {showConfirmation && (
        <div className='modal p-5'>
          <div className='modal-content m-5 p-1'>
            <h4>Realmente deseja excluir?</h4>
            <button onClick={confirmDelete}>Sim</button>
            <button onClick={closeConfirmation}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cards;
