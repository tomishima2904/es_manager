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

import chibainfo5.es_manager.domain.QuestionsKey;


@Entity
@Data
@Table(name = "questions")
@IdClass(value = QuestionsKey.class)
public class QuestionsEntity {
    public QuestionsEntity(){}

    public QuestionsEntity(Long userId, Long esId,
                            Integer qId, String question,
                            Integer aId, String answer){
        this.userId = userId;
        this.esId = esId;
        this.qId = qId;
        this.question = question;
        this.aId = aId;
        this.answer = answer;
    }

    @Id  // 主キー
    @NotNull
    @Column(name = "user_id")
    private Long userId;

    @Id  // 主キー
    @NotNull
    @Column(name = "es_id")
    private Long esId;

    @Id  // 主キー
    @NotNull
    @Column(name = "q_id")
    private Integer qId;

    @Size(min=0, max=200)
    @Column(name = "question", length = 200, nullable = true)
    private String question;

    @Id  // 主キー
    @NotNull
    @Column(name = "a_id")
    private Integer aId;

    @Size(min=0, max=2000)
    @Column(name = "answer", length = 2000, nullable = true)
    private String answer;

    public Long getUserId() {return userId;}
    public void setUserId(Long userId) {this.userId = userId;}

    public Long getEsId() {return esId;}
    public void setEsId(Long esId) {this.esId = esId;}

    public Integer getQId() {return qId;}
    public void setQid(Integer qId) {this.qId = qId;}

    public String getQuestion() {return question;}
    public void setQuestion(String question) {this.question = question;}

    public Integer getAId() {return aId;}
    public void setAid(Integer aId) {this.aId = aId;}

    public String getAnswer() {return answer;}
    public void setAnswer(String answer) {this.answer = answer;}

}
