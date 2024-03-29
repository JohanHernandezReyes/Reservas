package Cabin.Usa.Ciclo3.Modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.*;
import lombok.Data;


@Entity
@Table(name="cliente")
@Data
public class Cliente implements Serializable{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer idclient;
    
    @Column(length = 45)
    private String email;
    @Column(length = 45)
    private String password;
    @Column(length = 250)
    private String name;
    private Integer age; 
       
    @OneToMany(cascade=CascadeType.ALL, mappedBy="client")
    @JsonIgnoreProperties("client")
    public List<Message> messages;
   
    @OneToMany(cascade=CascadeType.ALL, mappedBy="client")
    @JsonIgnoreProperties("client")
    public List<Reservation> reservations;
}

