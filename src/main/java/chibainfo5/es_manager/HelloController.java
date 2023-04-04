package chibainfo5.es_manager;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class HelloController {
    @GetMapping("/")
    public String hello() {
        return "index";
    }
}
