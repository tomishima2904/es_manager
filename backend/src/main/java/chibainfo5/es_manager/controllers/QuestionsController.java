package chibainfo5.es_manager.controllers;

import java.util.List;

import javax.annotation.PostConstruct;

// For WebFlux
import reactor.core.publisher.Mono;
// For Repository
import org.springframework.beans.factory.annotation.Autowired;
// For Controller
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import chibainfo5.es_manager.domain.QuestionsEntity;
import chibainfo5.es_manager.domain.QuestionsResponse;
import chibainfo5.es_manager.repositories.QuestionsRepository;
import chibainfo5.es_manager.domain.EntrysheetsEntity;
import chibainfo5.es_manager.repositories.EntrysheetsRepository;

@RestController
public class QuestionsController {
    
    @Autowired
    private QuestionsRepository questionsRepository;

    @Autowired
    private EntrysheetsRepository entrysheetsRepository;

    // アプリ起動時にダミーデータをデータベース内に登録
    @PostConstruct
    public void init(){
        QuestionsEntity question1 = new QuestionsEntity(0L, 0L, 0, "志望動機は?", 30, 0, "ホワイトだから");
        QuestionsEntity question2 = new QuestionsEntity(0L, 0L, 1, "趣味は?", 30, 0, "サウナ");
        QuestionsEntity question3 = new QuestionsEntity(0L, 0L, 0, "志望動機は?", 30, 1, "駅近だから");
        QuestionsEntity question4 = new QuestionsEntity(0L, 1L, 0, "ガクチカは?", 20, 0, "特になし");
        questionsRepository.saveAndFlush(question1);
        questionsRepository.saveAndFlush(question2);
        questionsRepository.saveAndFlush(question3);
        questionsRepository.saveAndFlush(question4);
    }

    // エントリーシートを編集するためにDBからES情報を取得
    @GetMapping("/{userId}/entrysheets/{esId}")
    public Mono<QuestionsResponse> getEntrysheetQuestions(@PathVariable Long userId, @PathVariable Long esId) {

        // 条件に合うuserIdのあるesIdのデータをデータベースから取得
        EntrysheetsEntity entrysheet = entrysheetsRepository.findByUserIdAndEsId(userId, esId);
        List<QuestionsEntity> questions = questionsRepository.findByUserIdAndEsId(userId, esId);

        QuestionsResponse response = new QuestionsResponse();
        response.setQuestions(QuestionsResponse.convertToQuestionMap(questions));

        return Mono.just(response);
    }

}
