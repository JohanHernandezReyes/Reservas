package Cabin.Usa.Ciclo3.Servicios;

import Cabin.Usa.Ciclo3.Modelo.*;
import Cabin.Usa.Ciclo3.Repositorio.ReservationRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
        if (R.getId_reservation()==null){
            return ReservationRepository.GuardarReservacion(R);
        }else{
            Optional<Reservation> ReservationX=ReservationRepository.BuscarReservacion(R.getId_reservation());
            if(!ReservationX.isPresent()){
                return ReservationRepository.GuardarReservacion(R);
            } else {
                return R;
            }     
        }
    }  
    
    public Reservation ActualizarReservacion(Reservation R){
        if (R.getId_reservation()!=null){
            Optional<Reservation> ReservationX=ReservationRepository.BuscarReservacion(R.getId_reservation());
            if (ReservationX.isPresent()){
                if(R.getStart_date()!=null && R.getDevolution_date()!=null && R.getStatus()!=null){
                    ReservationX.get().setStart_date(R.getStart_date());
                    ReservationX.get().setDevolution_date(R.getDevolution_date());
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
    
   public List<Object[]>VerTopClientes(){
        return ReservationRepository.VerTopClientes();
    }
    
    public List<Reservation> ReporteStatus(String status){
        List<Reservation> reporte=ReservationRepository.VerReservacionesByStatus(status);
        return reporte;
    }
    
    public List<Reservation>ReservacionesEntreFechas(String Dia1, String Dia2){
        SimpleDateFormat parser=new SimpleDateFormat("yyyy-MM-dd");
        Date Fecha1=new Date();
        Date Fecha2=new Date();
        try{
            Fecha1=parser.parse(Dia1);
            Fecha2=parser.parse(Dia2);
        }catch(ParseException e){
            e.printStackTrace();
        }
        
        if(Fecha1.before(Fecha2)){
            return ReservationRepository.VerReservacionesEntreFechas(Fecha1, Fecha2);
        }else{
            return new ArrayList<>();
        }
    }    
}