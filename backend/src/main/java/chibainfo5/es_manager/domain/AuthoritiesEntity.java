package chibainfo5.es_manager.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "authorities")
public class AuthoritiesEntity {
    public AuthoritiesEntity(){}

    public AuthoritiesEntity(
        String username, String authority
    ){
        this.username = username;
        this.authority = authority;
    }

    @Id
    @NotNull
    @Column(name = "username")
    private String username;

    @NotNull
    @Column(name = "authority")
    private String authority;

    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}

    public String getAuthority() {return authority;}
    public void setAuthority(String authority) {this.authority = authority;}
}
