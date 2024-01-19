import axios from "axios";

const urlBase = "http://localhost:3001/api/dados";

const urlComens = "http://localhost:3001/api/comms"

const getAll = () => axios.get(urlBase);

const getMyPosts = (id) => axios.get(`${urlBase}/myposts/${id}`)

const getCommentsByPostId = (id) => axios.get(`${urlBase}/${id}`)



const getOne = (id) => axios.get(`${urlBase}/${id}`);

const create = (dadoObject) =>
  axios.post(`${urlBase}/post`, dadoObject, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const createComment = (dadoObject) =>
  axios.post(`${urlComens}/`, dadoObject, 
  );

const remove = (id) => axios.delete(`${urlBase}/${id}`);

const update = (id, dadoObject) =>
  axios.put(`${urlBase}/${id}`, dadoObject);

const dadoService = { getAll, getOne, create, remove, update, getMyPosts, createComment, getCommentsByPostId};

export default dadoService;
