package Cabin.Usa.Ciclo3.Controlador;

import Cabin.Usa.Ciclo3.Modelo.Users;
import Cabin.Usa.Ciclo3.Servicios.UsersServices;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/Admin")
@CrossOrigin(origins="*", methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ControladorUsers {
    
    @Autowired
    private UsersServices UsersServices;
    
    @GetMapping("/all")
    public List<Users> MostrarUsers(){
        return UsersServices.MostrarUsers();
    }
    
    @GetMapping("/{id}")
    public Optional<Users> BuscarUser(@PathVariable("id") int id){
        return UsersServices.BuscarUser(id);
    }
   
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Users GuardarUser(@RequestBody Users U){
        return UsersServices.GuardarUser(U);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Users ActualizarUser(@RequestBody Users U){
        return UsersServices.ActualizarUser(U);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean BorrarUser(@PathVariable("id") int id){
        return UsersServices.EliminarUser(id);
    }
}