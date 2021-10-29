package Cabin.Usa.Ciclo3.Repositorio;

import Cabin.Usa.Ciclo3.Modelo.Message;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MessageRepository {
    
    @Autowired
    private IMessagesCrud MessageCRUD;
    
    public List<Message> MostrarMensajes(){
        return (List<Message>) MessageCRUD.findAll();
    }
    
    public Optional<Message> BuscarMensaje(int id){
        return MessageCRUD.findById(id);
    }
    
    public Message GuardarMensaje(Message M){
        return MessageCRUD.save(M);
    }
   
    public void EliminarMensaje(int id){
        MessageCRUD.deleteById(id);
    }
}
