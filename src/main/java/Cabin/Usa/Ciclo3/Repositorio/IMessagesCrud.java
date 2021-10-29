package Cabin.Usa.Ciclo3.Repositorio;

import Cabin.Usa.Ciclo3.Modelo.Message;
import org.springframework.data.repository.CrudRepository;


public interface IMessagesCrud extends CrudRepository<Message, Integer>{
    
}

