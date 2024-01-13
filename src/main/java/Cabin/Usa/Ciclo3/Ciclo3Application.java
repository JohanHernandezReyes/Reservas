package Cabin.Usa.Ciclo3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EntityScan("Cabin.Usa.Ciclo3.Modelo")
@ComponentScan("Cabin.Usa.Ciclo3.Repositorio")
public class Ciclo3Application {

	public static void main(String[] args) {
		SpringApplication.run(Ciclo3Application.class, args);
	}

}
