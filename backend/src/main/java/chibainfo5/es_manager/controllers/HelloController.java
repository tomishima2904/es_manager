package chibainfo5.es_manager.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HelloController {

    @GetMapping("/")  // 指定したURLに対してGETメソッドを行う
    public String index() {
        return "Hello! Here is index";
    }
}
