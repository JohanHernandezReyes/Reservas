package Cabin.Usa.Ciclo3.Controlador;

import Cabin.Usa.Ciclo3.Modelo.Message;
import Cabin.Usa.Ciclo3.Servicios.MessageServices;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/Message")
@CrossOrigin(origins="*", methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ControladorMessages {
    
    @Autowired
    private MessageServices MessageServices;
    
    @GetMapping("/all")
    public List<Message> MostrarMensajes(){
        return MessageServices.MostrarMensajes();
    }
    
    @GetMapping("/{id}")
    public Optional<Message> BuscarMensaje(@PathVariable("id") int id){
        return MessageServices.BuscarMensaje(id);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Message GuardarMensaje(@RequestBody Message M){
        return MessageServices.GuardarMensaje(M);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Message ActualizarMensaje(@RequestBody Message M){
        return MessageServices.ActualizarMensaje(M);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean BorrarMensaje(@PathVariable("id") int id){
        return MessageServices.EliminarMensaje(id);
    }
}
