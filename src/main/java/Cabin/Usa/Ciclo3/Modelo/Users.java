package Cabin.Usa.Ciclo3.Modelo;

import java.io.Serializable;
import javax.persistence.*;
import lombok.Data;


@Entity
@Table(name="users")
@Data
public class Users implements Serializable{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    
    @Column(length = 250)
    private String nameuser;
    @Column(length = 45)
    private String email;
    @Column(length = 45)
    private String password;

    @Column(length = 2)
    private String authenticated;
  
}
