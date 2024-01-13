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
    private Integer idreservation;
     
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date startdate;
    
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date devolutiondate;
    
    @Column(name="status")
    private String status;
    
    @ManyToOne
    @JoinColumn(name="id")
    @JsonIgnoreProperties("reservations")
    private Cabin cabin; 
           
    @ManyToOne
    @JoinColumn(name="idclient")
    @JsonIgnoreProperties({"reservations","messages"})
    private Cliente client; 
    
        
    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties("reservation")
    private Score score;
  
}
