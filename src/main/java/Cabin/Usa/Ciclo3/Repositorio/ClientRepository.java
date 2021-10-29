package Cabin.Usa.Ciclo3.Repositorio;

import Cabin.Usa.Ciclo3.Modelo.Cliente;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ClientRepository {
    
    @Autowired
    private IClienteCrud ClientCRUD;
    
    public List<Cliente> MostrarClientes(){
        return (List<Cliente>) ClientCRUD.findAll();
    }
    
    public Optional<Cliente> BuscarCliente(int id){
        return ClientCRUD.findById(id);
    }
    
    public Cliente GuardarCliente(Cliente C){
        return ClientCRUD.save(C);
    }
   
    public void EliminarCliente(int id){
        ClientCRUD.deleteById(id);
    }
}
