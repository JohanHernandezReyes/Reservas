package Cabin.Usa.Ciclo3.Controlador;

import Cabin.Usa.Ciclo3.Modelo.Cabin;
import Cabin.Usa.Ciclo3.Servicios.CabinServices;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/Cabin")
@CrossOrigin(origins="*", methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ControladorCabin {
    
    @Autowired
    private CabinServices CabinServices;
    
    @GetMapping("/all")
    public List<Cabin> MostrarCabañas(){
        return CabinServices.MostrarCabañas();
    }
    
    @GetMapping("/{id}")
    public Optional<Cabin> BuscarCabaña(@PathVariable("id") int id){
        return CabinServices.BuscarCabaña(id);
    }
    
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Cabin GuardarCabaña(@RequestBody Cabin C){
        return CabinServices.GuardarCabaña(C);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Cabin ActualizarCabaña(@RequestBody Cabin C){
        return CabinServices.ActualizarCabaña(C);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean BorrarCabaña(@PathVariable("id") int id){
        return CabinServices.EliminarCabaña(id);
    }
    
}
