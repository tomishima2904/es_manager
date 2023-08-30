package chibainfo5.es_manager.domain;

import chibainfo5.es_manager.domain.EntrysheetsEntity;
import chibainfo5.es_manager.domain.QuestionsEntity;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



public class QuestionsResponse {
    private String userId;
    private int esId;
    private String company;
    private String job;
    private String event;
    private LocalDateTime deadline;
    private boolean isReleased;
    private Map<String, Question> questions;

    public String getUserId() {return userId;}
    public void setUserId(String userId) {this.userId = userId;}

    public int getEsId() {return esId;}
    public void setEsId(int esId) {this.esId = esId;}

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

    @Override
    public String toString(){
        return "{userId: " + this.userId + ", esId: " + this.esId +
        ", company: " + this.company + ", deadline: " + this.deadline +"}";
    }

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

    // リクエストボディのオブジェクトをDBに保存できる形式に変換
    public static EntrysheetsEntity convertToEntrysheetEntity(
        QuestionsResponse questionsResponse
    ){
        String userId = questionsResponse.getUserId();
        int esId = questionsResponse.getEsId();
        String company = questionsResponse.getCompany();
        String job = questionsResponse.getJob();
        String event = questionsResponse.getEvent();
        LocalDateTime deadline = questionsResponse.getDeadline();
        boolean isReleased = questionsResponse.getIsReleased();

        EntrysheetsEntity entrysheetEntity = new EntrysheetsEntity(
            userId, esId, company, job, event, deadline, isReleased
        );
        return entrysheetEntity;
    }

    // リクエストボディのオブジェクトをDBに保存できる形式に変換
    public static List<QuestionsEntity> convertToQuestionsList(
        QuestionsResponse questionsResponse
    ){
        List<QuestionsEntity> questionsList = new ArrayList<QuestionsEntity>();

        // Quesiton情報 (`question`や`maxChars`)を取得・保持
        for (Map.Entry<String, QuestionsResponse.Question> questionEntry : questionsResponse.getQuestions().entrySet()) {
            QuestionsResponse.Question question = questionEntry.getValue();

            // questionが空でない場合に行う
            // TODO: 空になることがないようにしたい
            if (question != null) {
                // Answer情報 (`aId`や`answer`)を取得・保持
                for (Map.Entry<String, String> answerEntry : question.getAnswers().entrySet()) {
                    QuestionsEntity questionsEntity = new QuestionsEntity();
                    questionsEntity.setUserId(questionsResponse.getUserId());
                    questionsEntity.setEsId(questionsResponse.getEsId());
                    questionsEntity.setQId(Integer.parseInt(questionEntry.getKey()));
                    questionsEntity.setQuestion(question.getQuestion());
                    questionsEntity.setMaxChars(question.getMaxChars());
                    questionsEntity.setAId(Integer.parseInt(answerEntry.getKey()));
                    questionsEntity.setAnswer(answerEntry.getValue());
                    questionsList.add(questionsEntity);
                }
            }

        }
        return questionsList;
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

        @Override
        public String toString(){
            return "{" + this.question + " " + this.maxChars +"}";
        }
    }

}
