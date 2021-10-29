package Cabin.Usa.Ciclo3.Repositorio;

import Cabin.Usa.Ciclo3.Modelo.Cabin;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CabinRepository {
    
    @Autowired
    private ICabinCrud CabinCRUD;
    
    public List<Cabin> MostrarCabañas(){
        return (List<Cabin>) CabinCRUD.findAll();
    }
    
    public Optional<Cabin> BuscarCabaña(int id){
        return CabinCRUD.findById(id);
    }
    
    public Cabin GuardarCabaña(Cabin C){
        return CabinCRUD.save(C);
    }
   
    public void EliminarCabaña(int id){
        CabinCRUD.deleteById(id);
    }
    
}
