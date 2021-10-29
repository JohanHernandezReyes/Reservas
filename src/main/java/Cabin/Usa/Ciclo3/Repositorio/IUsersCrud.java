package Cabin.Usa.Ciclo3.Repositorio;

import Cabin.Usa.Ciclo3.Modelo.Users;
import org.springframework.data.repository.CrudRepository;


public interface IUsersCrud extends CrudRepository<Users, Integer>{
    
}

