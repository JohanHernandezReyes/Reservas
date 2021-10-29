package Cabin.Usa.Ciclo3.Modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.*;
import lombok.Data;


@Entity
@Table(name="categoria")
@Data
public class Categoria implements Serializable{
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 45)
    private String name;
    @Column(length = 250)
    private String description;
    
    @OneToMany(cascade={CascadeType.PERSIST}, mappedBy="category")
    @JsonIgnoreProperties("category")
    public List<Cabin> cabins;
        
}
