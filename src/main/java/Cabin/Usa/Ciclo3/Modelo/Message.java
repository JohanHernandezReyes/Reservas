package Cabin.Usa.Ciclo3.Modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import lombok.Data;


@Entity
@Table(name="message")
@Data
public class Message implements Serializable{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer idmessage;
    
    @Column(length = 250)
    private String messagetext;
    
    @ManyToOne
    @JoinColumn(name="id")
    @JsonIgnoreProperties({"messages", "reservations"})
    private Cabin cabin; 
    
    @ManyToOne
    @JoinColumn(name="idclient")
    @JsonIgnoreProperties({"messages", "reservations"})
    private Cliente client;
    
  
}

