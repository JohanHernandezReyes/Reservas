package Cabin.Usa.Ciclo3.Controlador;

import Cabin.Usa.Ciclo3.Modelo.Categoria;
import Cabin.Usa.Ciclo3.Servicios.CategoryServices;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/Category")
@CrossOrigin(origins="*", methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ControladorCategory {
    
    @Autowired
    private CategoryServices CategoryServices;
    
    @GetMapping("/all")
    public List<Categoria> MostrarCategorys(){
        return CategoryServices.MostrarCategorias();
    }
    
    @GetMapping("/{id}")
    public Optional<Categoria> BuscarCategorias(@PathVariable("id") int id){
        return CategoryServices.BuscarCategoria(id);
    }
   
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Categoria GuardarCategoria(@RequestBody Categoria C){
        return CategoryServices.GuardarCategoria(C);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Categoria ActualizarCabaña(@RequestBody Categoria C){
        return CategoryServices.ActualizarCategoria(C);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean BorrarCabaña(@PathVariable("id") int id){
        return CategoryServices.EliminarCategoria(id);
    }
}
