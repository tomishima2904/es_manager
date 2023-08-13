package chibainfo5.es_manager.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import lombok.Data;

import chibainfo5.es_manager.domain.EntrysheetsKey;


@Entity
@Data
@Table(name = "entrysheets")
@IdClass(value = EntrysheetsKey.class)
public class EntrysheetsEntity {

    public EntrysheetsEntity(){}

    public EntrysheetsEntity(Long userId, Long esId, String company, String job,
                       LocalDateTime deadline, String event, Boolean isReleased){
        this.userId = userId;
        this.esId = esId;
        this.company = company;
        this.job = job;
        this.event = event;
        this.deadline = deadline;
        this.isReleased = isReleased;
    }

    @Id // 主キーの設定
    @NotNull // キーがnullでないか、あるいは空文字でないかの検証を行う
    @Column(name = "user_id")
    private Long userId;

    @Id // 主キーの設定
    @NotNull
    @Column(name = "es_id")
    private Long esId;

    @NotBlank
    @Size(min=1, max=40)
    @Column(name = "company", length = 40)
    private String company;

    @Size(min=0, max=20)
    @Column(name = "job", length = 20, nullable = true)
    private String job;

    @Size(min=0, max=30)
    @Column(name = "event", length = 30, nullable = true)
    private String event;

    @Column(name = "deadline", nullable = true)
    private LocalDateTime deadline;

    // @Column(name = "update")
    // private LocalDate update;

    @Column(name = "is_released", nullable = false)
    private boolean isReleased;

    // Getter and Setter methods
    public Long getEsId() {return esId;}
    public void setEsId(Long esId) {this.esId = esId;}

    public Long getUserId() {return userId;}
    public void setUserId(Long userId) {this.userId = userId;}

    public String getCompany() {return company;}
    public void setCompany(String company) {this.company = company;}

    public String getJob() {return job;}
    public void setJob(String job) {this.job = job;}

    public LocalDateTime getDeadline() {return deadline;}
    public void setDeadline(LocalDateTime deadline) {this.deadline = deadline;}

    public String getEvent() {return event;}
    public void setEvent(String event) {this.event = event;}

    // public LocalDateTime getUpdate() {return update;}
    // public void setUpdate(LocalDateTime update) {this.update = update;}

    public boolean getIsReleased() {return isReleased;}
    public void setIsReleased(Boolean isReleased) {this.isReleased = isReleased;}

}
