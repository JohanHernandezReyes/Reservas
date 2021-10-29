package Cabin.Usa.Ciclo3.Repositorio;

import Cabin.Usa.Ciclo3.Modelo.Reservation;
import org.springframework.data.repository.CrudRepository;


public interface IReservationsCrud extends CrudRepository<Reservation, Integer>{
    
}

