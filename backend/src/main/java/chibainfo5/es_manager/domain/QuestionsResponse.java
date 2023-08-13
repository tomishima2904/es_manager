package chibainfo5.es_manager.domain;

import chibainfo5.es_manager.domain.EntrysheetsEntity;
import chibainfo5.es_manager.domain.QuestionsEntity;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.time.LocalDateTime;


public class QuestionsResponse {
    private Long userId;
    private Long esId;
    private String company;
    private String job;
    private String event;
    private LocalDateTime deadline;
    private boolean isReleased;
    private Map<String, Question> questions;

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

    public boolean getIsReleased() {return isReleased;}
    public void setIsReleased(Boolean isReleased) {this.isReleased = isReleased;}

    public Map<String, Question> getQuestions() {return questions;}
    public void setQuestions(Map<String, Question> questions) {this.questions = questions;}

    // DBから取得したList<QuestionsEntity>をオブジェクト形式に変換
    public static QuestionsResponse convertToQuestionsResponse(
        EntrysheetsEntity entrysheet,
        List<QuestionsEntity> entities
    ) {
        QuestionsResponse response = new QuestionsResponse();
        response.setUserId(entrysheet.getUserId());
        response.setEsId(entrysheet.getEsId());
        response.setCompany(entrysheet.getCompany());
        response.setJob(entrysheet.getJob());
        response.setEvent(entrysheet.getEvent());
        response.setDeadline(entrysheet.getDeadline());
        response.setIsReleased(entrysheet.getIsReleased());

        // questionMap = {"questions": Map<String, Question>}
        Map<String, Question> questionMap = new HashMap<>();

        // 取得したレコード1行ずつ処理
        for (QuestionsEntity entity : entities) {
            String qId = Integer.toString(entity.getQId());
            // questionMap（最終的な返り値となるJSON）にqIdに該当するquestionオブジェクトがなければ定義
            Question question = questionMap.getOrDefault(qId, new Question());
            question.setQuestion(entity.getQuestion());
            question.setMaxChars(entity.getMaxChars());

            // hashMapのあるquestionに対するanswers全てを取得
            Map<String, String> answers = question.getAnswers();
            if (answers == null) {
                answers = new HashMap<>();
                question.setAnswers(answers);
            }
            answers.put(Integer.toString(entity.getAId()), entity.getAnswer());

            questionMap.put(qId, question);
        }

        response.setQuestions(questionMap);
        return response;
    }

    // Question型を定義してQuestionオブジェクトを扱いやすくする
    public static class Question {
        private String question;
        private int maxChars;
        private Map<String, String> answers;

        public String getQuestion() {return question;}
        public void setQuestion(String question) {this.question = question;}

        public int getMaxChars() {return maxChars;}
        public void setMaxChars(int maxChars) {this.maxChars = maxChars;}

        public Map<String, String> getAnswers() {return answers;}
        public void setAnswers(Map<String, String> answers) {this.answers = answers;}
    }

}
