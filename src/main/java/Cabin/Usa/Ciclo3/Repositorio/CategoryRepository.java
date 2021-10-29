package Cabin.Usa.Ciclo3.Repositorio;

import Cabin.Usa.Ciclo3.Modelo.Categoria;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryRepository {
    
    @Autowired
    private ICategoryCrud CategoryCRUD;
    
    public List<Categoria> MostrarCategorias(){
        return (List<Categoria>) CategoryCRUD.findAll();
    }
    
    public Optional<Categoria> BuscarCategoria(int id){
        return CategoryCRUD.findById(id);
    }
    
    public Categoria GuardarCategoria(Categoria C){
        return CategoryCRUD.save(C);
    }
   
    public void EliminarCategoria(int id){
        CategoryCRUD.deleteById(id);
    }
    
}
