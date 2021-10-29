package Cabin.Usa.Ciclo3.Servicios;

import Cabin.Usa.Ciclo3.Modelo.Reservation;
import Cabin.Usa.Ciclo3.Repositorio.ReservationRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationServices {
    
    @Autowired
    private ReservationRepository ReservationRepository;
    
 
    public List <Reservation> MostrarReservaciones(){
        return (List<Reservation>) ReservationRepository.MostrarReservaciones();
    }    
    
 
    public Optional<Reservation> BuscarReservacion(int id){
        return ReservationRepository.BuscarReservacion(id);
    }
    

    public Reservation GuardarReservacion(Reservation R){
        if (R.getIdReservation()==null){
            return ReservationRepository.GuardarReservacion(R);
        }else{
            Optional<Reservation> ReservationX=ReservationRepository.BuscarReservacion(R.getIdReservation());
            if(!ReservationX.isPresent()){
                return ReservationRepository.GuardarReservacion(R);
            } else {
                return R;
            }     
        }
    }  
    
    public Reservation ActualizarReservacion(Reservation R){
        if (R.getIdReservation()!=null){
            Optional<Reservation> ReservationX=ReservationRepository.BuscarReservacion(R.getIdReservation());
            if (ReservationX.isPresent()){
                if(R.getStartDate()!=null && R.getDevolutionDate()!=null && R.getStatus()!=null){
                    ReservationX.get().setStartDate(R.getStartDate());
                    ReservationX.get().setDevolutionDate(R.getDevolutionDate());
                    ReservationX.get().setStatus(R.getStatus());
                }
                return ReservationRepository.GuardarReservacion(ReservationX.get());
            }
        }    
        return R;
    }
    
    public boolean EliminarReservacion(int id){
         Optional<Reservation> ReservationX=BuscarReservacion(id);
         if(ReservationX.isPresent()){
            ReservationRepository.EliminarReservacion(id);
            return true;
        }
        return false;  
    }   
}