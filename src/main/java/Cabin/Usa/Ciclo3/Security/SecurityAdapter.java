
package Cabin.Usa.Ciclo3.Security;

/*import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityAdapter extends WebSecurityConfigurerAdapter{
    @Override
    protected void configure(HttpSecurity http)throws Exception{
        http.antMatcher("/**").authorizeRequests()
                .antMatchers(new String[]{"/", "/index"}).permitAll()
                .anyRequest().authenticated()
                .and()    
                .oauth2Login();
        http.cors().and().csrf().disable();
    }
}*/