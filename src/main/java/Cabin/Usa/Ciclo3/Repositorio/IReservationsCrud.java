package Cabin.Usa.Ciclo3.Repositorio;

import Cabin.Usa.Ciclo3.Modelo.Reservation;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface IReservationsCrud extends CrudRepository<Reservation, Integer>{
    
    public List<Reservation>findAllByStartDateAfterAndStartDateBefore(Date Fecha1,Date Fecha2);
    
    public List<Reservation>findAllByStatus(String Status);
    
    @Query("SELECT C.client, COUNT(C.client) FROM Reservation AS C GROUP BY C.client ORDER BY COUNT(C.client) DESC")
    public List<Object[]>countTotalReservationByCliente(); 
    
}

