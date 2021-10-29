package Cabin.Usa.Ciclo3.Controlador;

import Cabin.Usa.Ciclo3.Modelo.Score;
import Cabin.Usa.Ciclo3.Servicios.ScoreServices;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/Score")
@CrossOrigin(origins="*", methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ControladorScores {
    
    @Autowired
    private ScoreServices ScoreServices;
    
    @GetMapping("/all")
    public List<Score> MostrarScore(){
        return ScoreServices.MostrarScore();
    }
    
    @GetMapping("/{id}")
    public Optional<Score> BuscarScore(@PathVariable("id") int id){
        return ScoreServices.BuscarScore(id);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Score GuardarScore(@RequestBody Score S){
        return ScoreServices.GuardarScore(S);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Score ActualizarScore(@RequestBody Score S){
        return ScoreServices.ActualizarScore(S);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean BorrarScore(@PathVariable("id") int id){
        return ScoreServices.EliminarScore(id);
    }
}
