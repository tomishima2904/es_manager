import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;


@Entity
@Table(name = "es")
public class EsEntity {

    @Id // 主キーの設定
    @GeneratedValue(strategy = GenerationType.IDENTITY) // identity列を用いて主キーを生成
    @Column(name = "esId")
    private String esId;

    @NotEnpty // キーがnullでないか、あるいは空文字でないかの検証を行う
    @Column(name = "userId")
    private String userId;

    @NotEnpty
    @Column(name = "company", length = 40)
    private String company;

    @NotEnpty
    @Column(name = "job", length = 20)
    private String job;

    @Column(name = "deadline")
    private LocalDate deadline;

    @NotEnpty
    @Column(name = "event", length = 30)
    private String event;

    @NotEnpty
    @Column(name = "update")
    private LocalDate update;

    @NotEnpty
    @Column(name = "release")
    private boolean release;

    // Getter and Setter methods
    public int getEsID() {
        return esID;
    }

    public void setEsID(int esId) {
        this.esId = esId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public LocalDate getUpdate() {
        return update;
    }

    public void setUpdate(LocalDate update) {
        this.update = update;
    }

    public boolean getRelease() {
        return release;
    }

    public void setRelease(boolean release) {
        this.release = release;
    }



}
