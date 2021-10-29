package Cabin.Usa.Ciclo3.Servicios;

import Cabin.Usa.Ciclo3.Modelo.Cliente;
import Cabin.Usa.Ciclo3.Repositorio.ClientRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientServices {
    
    @Autowired
    private ClientRepository ClientRepository;
    
 
    public List <Cliente> MostrarCliente(){
        return (List<Cliente>) ClientRepository.MostrarClientes();
    }    
    
 
    public Optional<Cliente> BuscarCliente(int id){
        return ClientRepository.BuscarCliente(id);
    }
    

    public Cliente GuardarCliente(Cliente C){
        if (C.getIdClient()==null){
            return ClientRepository.GuardarCliente(C);
        }else{
            Optional<Cliente> ClientX=ClientRepository.BuscarCliente(C.getIdClient());
            if(!ClientX.isPresent()){
                return ClientRepository.GuardarCliente(C);
            } else {
                return C;
            }     
        }
    } 
    
    public Cliente ActualizarCliente(Cliente C){
        if (C.getIdClient()!=null){
            Optional<Cliente> ClienteX=ClientRepository.BuscarCliente(C.getIdClient());
            if (ClienteX.isPresent()){
                if(C.getPassword()!=null && C.getName()!=null && C.getAge()!=null && C.getEmail()!=null){
                    ClienteX.get().setEmail(C.getEmail());
                    ClienteX.get().setPassword(C.getPassword());
                    ClienteX.get().setName(C.getName());
                    ClienteX.get().setAge(C.getAge());
                }
                return ClientRepository.GuardarCliente(ClienteX.get());
            }
        }    
        return C;
    }
    
    public boolean EliminarCliente(int id){
         Optional<Cliente> ClienteX=BuscarCliente(id);
         if(ClienteX.isPresent()){
            ClientRepository.EliminarCliente(id);
            return true;
        }
        return false;  
    }   
    
}