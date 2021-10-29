package Cabin.Usa.Ciclo3.Repositorio;

import Cabin.Usa.Ciclo3.Modelo.Score;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ScoreRepository {
    
    @Autowired
    private IScoreCrud ScoreCRUD;
    
    public List<Score> MostrarScore(){
        return (List<Score>) ScoreCRUD.findAll();
    }
    
    public Optional<Score> BuscarScore(int id){
        return ScoreCRUD.findById(id);
    }
    
    public Score GuardarScore(Score S){
        return ScoreCRUD.save(S);
    }
    
    public void EliminarScore(int id){
        ScoreCRUD.deleteById(id);
    }
}
