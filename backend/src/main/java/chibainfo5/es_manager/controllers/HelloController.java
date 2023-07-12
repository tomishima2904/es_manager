package chibainfo5.es_manager.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
public class HelloController {
    // FIXME: index関数の型の定義がおそらくスタンダードじゃない気がする
    @GetMapping("/")  // URLを指定
    public Map<String, String> index() {
        return Map.of("msg", "Hello!");  // JSON (Pythonでいえばdict型のオブジェクトを返す)
    }
}
