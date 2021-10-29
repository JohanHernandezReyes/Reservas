package Cabin.Usa.Ciclo3.Modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import lombok.Data;
import javax.validation.constraints.*;


@Entity
@Table(name="score")
@Data
public class Score implements Serializable{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    
    @Column(columnDefinition = "int default 5")
    @Min(0)
    @Max(5)
    private Integer score;
        
    @Column(length = 250)
    private String mensajecalif;
    
    @OneToOne
    @JsonIgnoreProperties("score")
    private Reservation reservation; 
        
  
  
}
