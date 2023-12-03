package chibainfo5.es_manager.controllers;

import chibainfo5.es_manager.domain.QuestionsEntity;
import chibainfo5.es_manager.domain.QuestionsResponse;
import chibainfo5.es_manager.repositories.QuestionsRepository;
import chibainfo5.es_manager.domain.EntrysheetsEntity;
import chibainfo5.es_manager.repositories.EntrysheetsRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;


@RestController
public class QuestionsController {
    
    @Autowired
    private QuestionsRepository questionsRepository;

    @Autowired
    private EntrysheetsRepository entrysheetsRepository;

    // アプリ起動時にダミーデータをデータベース内に登録
    @PostConstruct
    public void init(){
        QuestionsEntity question1 = new QuestionsEntity(0, 0, 0, "志望動機は?", 30, 0, "ホワイトだから");
        QuestionsEntity question2 = new QuestionsEntity(0, 0, 1, "趣味は?", 30, 0, "サウナ");
        QuestionsEntity question3 = new QuestionsEntity(0, 0, 0, "志望動機は?", 30, 1, "駅近だから");
        QuestionsEntity question4 = new QuestionsEntity(0, 1, 0, "ガクチカは?", 20, 0, "特になし");
        QuestionsEntity question5 = new QuestionsEntity(0, 0, 1, "趣味は?", 30, 1, "旅行");
        questionsRepository.saveAndFlush(question1);
        questionsRepository.saveAndFlush(question2);
        questionsRepository.saveAndFlush(question3);
        questionsRepository.saveAndFlush(question4);
        questionsRepository.saveAndFlush(question5);
    }

    // エントリーシートを編集するためにDBからES情報を取得
    @GetMapping("/users/{userId}/entrysheets/{esId}")
    @CrossOrigin(origins = {"http://localhost:3001"})
    public Mono<QuestionsResponse> getEntrysheetQuestions(@PathVariable int userId, @PathVariable int esId) {

        // 条件に合うuserIdのあるesIdのデータをデータベースから取得
        EntrysheetsEntity entrysheet = entrysheetsRepository.findByUserIdAndEsId(userId, esId);
        List<QuestionsEntity> questions = questionsRepository.findByUserIdAndEsId(userId, esId);

        QuestionsResponse response = QuestionsResponse.convertToQuestionsResponse(entrysheet, questions);

        return Mono.just(response);
    }

    // 編集されたES情報をDBで更新・削除
    // curl -X POST -H "Content-Type: application/json" -d '{body}' http://localhost:8001/{userId}/entrysheets/{esId}
    @PostMapping("/users/{userId}/entrysheets/{esId}")
    @Transactional
    @CrossOrigin(origins = {"http://localhost:3001"})
    public Mono<QuestionsResponse> updateEntrysheetQuestions(
        @PathVariable int userId, @PathVariable int esId,
        @RequestBody QuestionsResponse inputQuestionsResponse
    ){
        // 差分（特に削除されたレコード）を把握するために古いレコードを取得
        List<QuestionsEntity> oldQuestionsList = questionsRepository.findByUserIdAndEsId(userId, esId);

        // Formから送信されたJSON形式の新しいレコードをDBに保存できる形式に変換
        EntrysheetsEntity newEntrysheet = QuestionsResponse.convertToEntrysheetEntity(inputQuestionsResponse);
        List<QuestionsEntity> newQuestionsList = QuestionsResponse.convertToQuestionsList(inputQuestionsResponse);

        // 古いレコードにはあった削除されたものを削除
        for (QuestionsEntity oldEntity : oldQuestionsList) {
            boolean isEntityExistsInNewList = newQuestionsList.stream()
                    .anyMatch(newEntity ->
                            newEntity.getUserId() == oldEntity.getUserId() &&
                            newEntity.getEsId() == oldEntity.getEsId() &&
                            newEntity.getQId() == oldEntity.getQId() &&
                            newEntity.getAId() == oldEntity.getAId());

            if (!isEntityExistsInNewList) {
                questionsRepository.delete(oldEntity);
            }
        }

        // 更新されたものを保存
        entrysheetsRepository.save(newEntrysheet);
        for (QuestionsEntity newEntity : newQuestionsList) {
            questionsRepository.save(newEntity);
        }

        // questionsが空の場合初期値を与える  (生じないが一応)
        if (newQuestionsList.size() == 0){
            QuestionsEntity initQuestion = new QuestionsEntity(userId, esId, 0, "", 400, 0, "");
            questionsRepository.saveAndFlush(initQuestion);
            List<QuestionsEntity> questions = new ArrayList<>();
            questions.add(initQuestion);
            QuestionsResponse newQuestionsResponse = QuestionsResponse.convertToQuestionsResponse(newEntrysheet, questions);
            return Mono.just(newQuestionsResponse);
        }

        return Mono.just(inputQuestionsResponse);
    }

}

/*  テスト用
curl -X POST http://localhost:8001/1/entrysheets
curl -X POST -H "Content-Type: application/json" -d '{"userId":1,"esId":1,"company":"BbBbBbE","job":"総合職","event":"夏インターン","deadline":"2083-09-25T12:45:00","isReleased":true,"questions":{"0":{"question":"ガクチカは?","maxChars":500,"answers":{"0":"nothing"}}}}' http://localhost:8001/1/entrysheets/1
 */
