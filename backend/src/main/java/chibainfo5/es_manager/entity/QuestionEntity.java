import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;


@Entity
@Table(name = "question")
public class QuestionEntity {

    @Id // 主キーの設定
    @GeneratedValue(strategy = GenerationType.IDENTITY) // identity列を用いて主キーを生成
    @Column(name = "question_id")
    private Integer questionId;

    @NotEnpty // キーがnullでないか、あるいは空文字でないかの検証を行う
    @Column(name = "es_id")
    private Integer esId;

    @NotEnpty // キーがnullでないか、あるいは空文字でないかの検証を行う
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "question", length = 200)
    private String question;

    @Column(name = "answer", length = 2000)
    private String answer;

    @NotEnpty // キーがnullでないか、あるいは空文字でないかの検証を行う
    @Column(name = "update")
    private LocalDate update;

    // コンストラクタ、Getter、Setter、その他のメソッド
    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public Integer getEsId() {
        return esId;
    }

    public void setEsId(Integer esId) {
        this.esId = esId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }


}
