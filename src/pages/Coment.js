import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dadoService from '../services/phonebook';
import './Coment.css'; // Importe um arquivo CSS separado para os estilos
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import useAuth from "../hooks/useAuth";

function Coment() {

  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const urlBase = 'http://localhost:3001/images/';
  const {user} = useAuth();

  useEffect(() => {
    fetchData()
    fetchPostAndComments(); // Carrega o post e os comentários iniciais
  }, []);

  const fetchPostAndComments = () => {
    dadoService
      .getOne(postId)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar post:", error);
        setError("Erro ao buscar post.");
      });

    dadoService
      .getCommentsByPostId(postId)
      .then((response) => {
        setComments(response.data);
        setError(null); // Limpar o erro ao buscar os comentários com sucesso
      })
      .catch((error) => {
        console.error("Erro ao buscar comentários:", error);
        setError("Erro ao buscar comentários.");
      });
  };

  const fetchData = () => {
    dadoService
      .getOne(postId)
      .then((response) => {
        setPost(response.data);

      })
      .catch((error) => {
        if (error.response) {
          // O servidor respondeu com um status de erro
          console.error("Erro na requisição:", error.response);
        } else if (error.request) {
          // A requisição foi feita, mas não houve resposta do servidor
          console.error("Não foi possível se conectar ao servidor.");
          setError(
            "Não foi possível se conectar ao servidor. Verifique sua conexão de rede."
          );
        } else {
          // Algo aconteceu na configuração da requisição que causou o erro
          console.error("Erro na configuração da requisição:", error.message);
        }
      });
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const submitComment = () => {
    // Certifique-se de que o newComment não está vazio antes de enviar
    if (newComment.trim() === '') {
      setError('O comentário não pode estar vazio.');
      return;
    }
    const dadoObject = {
      comment: newComment,
      user_id: user.id,
      post_id: postId
    };
    console.log(dadoObject)
    // Envia o novo comentário para o backend
    dadoService.createComment(dadoObject)
    
      .then(() => {
        // Após criar o comentário, recarregue os comentários
        fetchPostAndComments();
        // Limpar o campo de novo comentário após o envio
        setNewComment('');
        setError(null); // Limpar qualquer erro anterior
      })
      .catch((error) => {
        console.error("Erro ao criar comentário:", error);
        setError("Erro ao criar comentário.");
      });
  };


  return (
    <div className=" mt-5 main">
      <Header />
      <div className='p-5'>
        {/* Exibe o post aqui */}
        <div>
          <h2 className="post-title ">{post?.nome}</h2>
          <p className="post-description">{post?.descricao}</p>
          <img
            src={urlBase + post?.foto}
            className='card-img-top'
            alt='foto'
          />
        </div>

        {/* Exibe os comentários existentes */}
        <h3>Comentários:</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-3">
            <p className="bg-light p-2">{comment.comentario}</p>
            {/* Adicione outros campos conforme necessário */}
          </div>
        ))}

        {/* Exibe o erro, se houver */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Formulário para adicionar novos comentários */}
        <div className="comment-form mt-3">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Adicione um comentário..."
            value={newComment}
            onChange={handleCommentChange}
          />
          <button className="btn btn-primary mt-2" onClick={submitComment}>Enviar Comentário</button>
        </div>
      </div>
      {comments}
      <Footer />
    </div>

  );
}

export default Coment;
