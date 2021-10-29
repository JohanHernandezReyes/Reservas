package Cabin.Usa.Ciclo3.Repositorio;

import Cabin.Usa.Ciclo3.Modelo.Users;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UsersRepository {
    
    @Autowired
    private IUsersCrud UsersCRUD;
    
    public List<Users> MostrarUsuarios(){
        return (List<Users>) UsersCRUD.findAll();
    }
    
    public Optional<Users> BuscarUsuario(int id){
        return UsersCRUD.findById(id);
    }
    
    public Users GuardarUsuario(Users U){
        return UsersCRUD.save(U);
    }
    
    public void EliminarUsuario(int id){
        UsersCRUD.deleteById(id);
    }
}