const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h)=>{
    const { title, tags, body} = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote ={
        title, tags, body, id, createdAt, updatedAt,
    }

    notes.push(newNote);
    const isSucces = notes.filter((note)=>note.id===id).length>0
    
    if (isSucces) {
        const response = h.response({
            status:'succes',
            message:'catatan berhasil di tambahkan',
            data:{
                noteId: id,
            }
        })
        response.code(201);
        return response
    }

    const response = h.response({
        status:'fail',
        message:'catatan gagal di tambahkan',
    })
    response.code(500);
    return response;
}


const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
  });

const getNoteByIdHandler =(request, h)=>{
    const {id} = request.params;

    const note = notes.filter((n)=>n.id===id)[0];

    if (note!==undefined) {
        return{
            status: 'success',
            data:{
                note
            }
        }
    }

    const response= h.response({
        status:'fail',
        message:'catatan tidak di temukan'
    });

    response.code(404);
    return response;
}

const editNoteByIdHandler = (request , h)=>{
    const {id} = request.params;

    const {title, tags, body} = request.payload;
    const updatedAt  = new Date().toISOString();

    const index = notes.findIndex((note)=>note.id === id)

    if (index !== -1) {
        notes[index]={
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        }
        const response = h.response({
            status:'succes',
            message:'catatan berhasil diperbarui'
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status:'fail',
        message:'gagal memperbarui catatan',
    })
    response.code(404)
    return response;
}


module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler,editNoteByIdHandler};