package Cabin.Usa.Ciclo3.Modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.*;
import lombok.Data;


@Entity
@Table(name="cabin")
@Data
public class Cabin implements Serializable{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    
    @Column(length = 45)
    private String name;
    @Column(length = 45)
    private String brand;
    private Integer rooms;
    @Column(length = 250)
    private String description;
    
    
    @ManyToOne
    @JoinColumn(name="category")
    @JsonIgnoreProperties("cabins")
    private Categoria category; 
    
    @OneToMany(cascade={CascadeType.PERSIST}, mappedBy="cabin")
    @JsonIgnoreProperties({"cabin", "client"})
    public List<Message> messages;
    
    @OneToMany(cascade={CascadeType.PERSIST}, mappedBy="cabin")
    @JsonIgnoreProperties({"cabin", "messages"})
    public List<Reservation> reservations;
    
}
