package Cabin.Usa.Ciclo3.Modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.*;
import lombok.Data;


@Entity
@Table(name="Reservation")
@Data
public class Reservation implements Serializable{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer idReservation;
     
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date startDate;
    
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date devolutionDate;
    
    @Column(name="status")
    private String status="created";
    
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
