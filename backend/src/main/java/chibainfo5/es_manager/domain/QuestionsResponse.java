package chibainfo5.es_manager.domain;

import chibainfo5.es_manager.domain.EntrysheetsEntity;
import chibainfo5.es_manager.domain.QuestionsEntity;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import org.json.JSONObject;


public class QuestionsResponse {
    // private EntrysheetsEntity entrysheet;
    private Map<String, Question> questions;

    public Map<String, Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Map<String, Question> questions) {
        this.questions = questions;
    }

    // DBから取得したList<QuestionsEntity>をオブジェクト形式に変換
    public static Map<String, Question> convertToQuestionMap(List<QuestionsEntity> entities) {

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

        return questionMap;
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
