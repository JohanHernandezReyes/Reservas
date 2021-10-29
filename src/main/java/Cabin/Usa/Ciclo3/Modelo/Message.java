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
    private Integer idMessage;
    
    @Column(length = 250)
    private String messageText;
    
    @ManyToOne
    @JoinColumn(name="cabin")
    @JsonIgnoreProperties({"messages", "reservations"})
    private Cabin cabin; 
    
    @ManyToOne
    @JoinColumn(name="client")
    @JsonIgnoreProperties({"messages", "reservations"})
    private Cliente client;
    
  
}

