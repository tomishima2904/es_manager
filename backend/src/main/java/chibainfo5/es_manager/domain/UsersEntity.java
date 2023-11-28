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
@Table(name = "users")
public class UsersEntity {
    public UsersEntity(){}

    public UsersEntity(
            String username, String password, boolean enabled,
            String firstName, String familyName){
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.firstName = firstName;
        this.familyName = familyName;
    }

    @Id
    @NotNull
    @Column(name = "username")
    private String username;

    @NotNull
    @Column(name = "password")
    private String password;

    @Column(name = "enabled")
    private boolean enabled;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "family_name")
    private String familyName;

    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}

    public String getPassword() {return password;}
    public void setPassword(String password) {this.password = password;}

    public boolean getEnabled() {return enabled;}
    public void setEnabled(boolean enabled) {this.enabled = enabled;}

    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getFamilyName() {return familyName;}
    public void setFamilyName(String familyName) {this.familyName = familyName;}
}
