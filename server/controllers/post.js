const Post = require("../models/post");
const image = require("../utils/image");

// Funciones
// Crear post
function createPost(req, res){
    const post = new Post(req.body);
    post.created_at = new Date();

    const { title, path } = req.body;

    if (!path){
        const pathSinEspacio = title.replace(/\s/g, "-");
        post.path = `${pathSinEspacio}`;
    }

    if (req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature);
        post.miniature = imagePath;
    }

    post.save((error, postStored) => {
        if (error) res.status(400).send({ msg: "Error al crear el post" });
        else res.status(200).send(postStored);
    });
}

// obtener post
function getPost(req, res){
    const {page = 1, limit = 10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: {created_at: "desc" },
    }

    Post.paginate({}, options, (error, postStored) =>{
        if(error) res.status(400).send({ msg: "Error al obtener los Post"});
        else res.status(200).send(postStored);
    })

}

// Actualizar post
function updatePost(req, res){
    const { id } = req.params;
    const PostData = req.body;

    if (req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature);
        PostData.miniature = imagePath;
    }

    Post.findByIdAndUpdate({_id: id}, PostData,(error) =>{
        if (error) res.status(400).send({ msg: "Error al actualizar el post" });
        else res.status(200).send({ msg:"Actualizacion correcta "});
    })
}

// Eliminar Post
function deletePost(req, res){
    const { id } = req.params;
    Post.findByIdAndDelete(id, (error) =>{
        if(error) res.status(400).send({ msg: "Error al eliminar el post"});
        else res.status(200).send({ msg:"Post eliminado" });
    });
}

// Obtener url post
function getPathPost(req, res){
    const { path } = req.params;

    Post.findOne({ path }, (error, postStored) => {
        if (error) { 
            res.status(500).send({ msg:"Error del servidor" });
        } else if (!postStored) { 
            console.log(postStored);
            res.status(400).send({ msg:"No se ha encontrado ningun post" });
        } else {
             res.status(200).send(postStored);
        }
    });
}

module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost,
    getPathPost,
};