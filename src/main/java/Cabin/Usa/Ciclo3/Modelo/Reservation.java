package Cabin.Usa.Ciclo3.Modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import lombok.Data;


@Entity
@Table(name="reservation")
@Data
public class Reservation implements Serializable{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id_reservation;
     
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date start_date;
    
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date devolution_date;
    
    @Column(name="status")
    private String status;
    
    @ManyToOne
    @JoinColumn(name="cabin")
    @JsonIgnoreProperties("reservations")
    private Cabin cabin; 
           
    @ManyToOne
    @JoinColumn(name="client")
    @JsonIgnoreProperties({"reservations","messages"})
    private Cliente client; 
    
        
    @OneToOne(cascade = {CascadeType.REMOVE},mappedBy="reservation")
    @JsonIgnoreProperties("reservation")
    private Score score;
  
}
