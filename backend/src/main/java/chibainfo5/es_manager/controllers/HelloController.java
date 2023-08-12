package chibainfo5.es_manager.controllers;

import chibainfo5.es_manager.entity.EntrysheetsEntity;

import reactor.core.publisher.Mono;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class HelloController {
    @GetMapping("/")  // 指定したURLに対してGETメソッドを行う
    public Mono<String> index() {
        return Mono.just("Hello Spring!");
    }

    @GetMapping("/{userId}")
    public Mono<List<EntrysheetsEntity>> getUserEntrysheets(@PathVariable Long userId) {
        List<EntrysheetsEntity> entrysheets = new ArrayList<>();

        EntrysheetsEntity entrysheet1 = new EntrysheetsEntity(userId, 0L, "A株式会社", "エンジニア", null, "本選考", false);
        entrysheets.add(entrysheet1);

        EntrysheetsEntity entrysheet2 = new EntrysheetsEntity(userId, 1L, "B株式会社", "総合職", null, "夏インターン", true);
        entrysheets.add(entrysheet2);

        return Mono.just(entrysheets);
    }
}
