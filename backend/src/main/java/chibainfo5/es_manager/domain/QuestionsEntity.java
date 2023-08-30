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

    public QuestionsEntity(String userId, int esId,
                            int qId, String question, int maxChars,
                            int aId, String answer){
        this.userId = userId;
        this.esId = esId;
        this.qId = qId;
        this.question = question;
        this.maxChars = maxChars;
        this.aId = aId;
        this.answer = answer;
    }

    @Id  // 主キー
    @NotNull
    @Column(name = "user_id")
    private String userId;

    @Id  // 主キー
    @NotNull
    @Column(name = "es_id")
    private int esId;

    @Id  // 主キー
    @NotNull
    @Column(name = "q_id")
    private int qId;

    @Size(min=0, max=200)
    @Column(name = "question", length = 200, nullable = true)
    private String question;

    @Column(name = "maxChars", columnDefinition = "INT DEFAULT 400")
    private int maxChars;

    @Id  // 主キー
    @NotNull
    @Column(name = "a_id")
    private int aId;

    @Size(min=0, max=2000)
    @Column(name = "answer", length = 2000, nullable = true)
    private String answer;

    public String getUserId() {return userId;}
    public void setUserId(String userId) {this.userId = userId;}

    public int getEsId() {return esId;}
    public void setEsId(int esId) {this.esId = esId;}

    public int getQId() {return qId;}
    public void setQId(int qId) {this.qId = qId;}

    public String getQuestion() {return question;}
    public void setQuestion(String question) {this.question = question;}

    public int getMaxChars() {return maxChars;}
    public void setMaxChars(int maxChars) {this.maxChars = maxChars;}

    public int getAId() {return aId;}
    public void setAId(int aId) {this.aId = aId;}

    public String getAnswer() {return answer;}
    public void setAnswer(String answer) {this.answer = answer;}

    @Override
    public String toString(){
        return "{userId: " + this.userId + ", esId: " + this.esId +
         ", qId: " + this.qId + ", question: " + this.question +
         ", aId: " + this.aId + ", answer: " + this.answer +"}";
    }

}
