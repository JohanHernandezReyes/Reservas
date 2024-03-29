package Cabin.Usa.Ciclo3.Servicios;

import Cabin.Usa.Ciclo3.Modelo.Message;
import Cabin.Usa.Ciclo3.Repositorio.MessageRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageServices {
    
    @Autowired
    private MessageRepository MessageRepository;
    
 
    public List <Message> MostrarMensajes(){
        return (List<Message>) MessageRepository.MostrarMensajes();
    }    
    
 
    public Optional<Message> BuscarMensaje(int id){
        return MessageRepository.BuscarMensaje(id);
    }
    

    public Message GuardarMensaje(Message M){
        if (M.getIdmessage()==null){
            return MessageRepository.GuardarMensaje(M);
        }else{
            Optional<Message> MessageX=MessageRepository.BuscarMensaje(M.getIdmessage());
            if(!MessageX.isPresent()){
                return MessageRepository.GuardarMensaje(M);
            } else {
                return M;
            }     
        }
    }
    
    public Message ActualizarMensaje(Message M){
        if (M.getIdmessage()!=null){
            Optional<Message> MessageX=MessageRepository.BuscarMensaje(M.getIdmessage());
            if (MessageX.isPresent()){
                if(M.getMessagetext()!=null){
                    MessageX.get().setMessagetext(M.getMessagetext());
                }
                return MessageRepository.GuardarMensaje(MessageX.get());
            }
        }    
        return M;
    }
    
    public boolean EliminarMensaje(int id){
         Optional<Message> MessageX=BuscarMensaje(id);
         if(MessageX.isPresent()){
            MessageRepository.EliminarMensaje(id);
            return true;
        }
        return false;  
    }   
}