package Cabin.Usa.Ciclo3.Repositorio;

import Cabin.Usa.Ciclo3.Modelo.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReservationRepository {
    
    @Autowired
    private IReservationsCrud ReservationCRUD;
    
    public List<Reservation> MostrarReservaciones(){
        return (List<Reservation>) ReservationCRUD.findAll();
    }
    
    public Optional<Reservation> BuscarReservacion(int id){
        return ReservationCRUD.findById(id);
    }
    
    public Reservation GuardarReservacion(Reservation R){
        return ReservationCRUD.save(R);
    }
   
    public void EliminarReservacion(int id){
        ReservationCRUD.deleteById(id);
    }
    
    public List<Reservation>VerReservacionesByStatus(String Status){
        return ReservationCRUD.findAllByStatus(Status);
    }
    
    public List<Reservation>VerReservacionesEntreFechas(Date Fecha1,Date Fecha2){
        return ReservationCRUD.findAllByStartdateAfterAndStartdateBefore(Fecha1, Fecha2);
    }
    
    public List<Object[]>VerTopClientes(){
        List<Object[]> reporte=ReservationCRUD.countTotalReservationByCliente();
            
        return reporte;
    }
}
