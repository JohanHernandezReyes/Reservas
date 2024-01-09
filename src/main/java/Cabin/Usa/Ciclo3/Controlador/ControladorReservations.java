package Cabin.Usa.Ciclo3.Controlador;

import Cabin.Usa.Ciclo3.Modelo.*;
import Cabin.Usa.Ciclo3.Servicios.ReservationServices;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/Reservation")
@CrossOrigin(origins="*", methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ControladorReservations {
    
    @Autowired
    private ReservationServices ReservationServices;
    
    @GetMapping("/all")
    public List<Reservation> MostrarReservaciones(){
        return ReservationServices.MostrarReservaciones();
    }
    
    @GetMapping("/{id}")
    public Optional<Reservation> BuscarReservacion(@PathVariable("id") int id){
        return ReservationServices.BuscarReservacion(id);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation GuardarReservacion(@RequestBody Reservation R){
        return ReservationServices.GuardarReservacion(R);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation ActualizarReservacion(@RequestBody Reservation R){
        return ReservationServices.ActualizarReservacion(R);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean BorrarReservacion(@PathVariable("id") int id){
        return ReservationServices.EliminarReservacion(id);
    }
    
    /*Informes Reto5*/
    @GetMapping("/report-completed")
    public List<Reservation> ReporteStatusCompleted(){
        return ReservationServices.ReporteStatus("completed");
    }
    
    @GetMapping("/report-cancelled")
    public List<Reservation> ReporteStatusCancelled(){
        return ReservationServices.ReporteStatus("cancelled");
    }
    
    @GetMapping("/report-clients")
    public List<Object[]>VerTopClientes(){
        return ReservationServices.VerTopClientes();
    }
    
    @GetMapping("/report-dates/{Fecha1}/{Fecha2}")
    public List<Reservation>ReservacionesEntreFechas(@PathVariable("Fecha1")String Dia1, @PathVariable("Fecha2")String Dia2){
        return ReservationServices.ReservacionesEntreFechas(Dia1, Dia2);
    }
}
