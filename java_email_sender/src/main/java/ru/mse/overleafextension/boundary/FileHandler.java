package ru.mse.overleafextension.boundary;

import io.undertow.server.HttpHandler;
import io.undertow.server.HttpServerExchange;
import io.undertow.util.Headers;
import io.undertow.util.HttpString;
import ru.mse.overleafextension.control.FileService;

import java.util.Date;

public class FileHandler implements HttpHandler {
    @Override
    public void handleRequest(HttpServerExchange exchange) throws Exception {
        System.out.println(new Date() + " " + FileHandler.class.getName() + " Got HTTP request: " + exchange.getRequestHeaders());
        if (exchange.getRequestHeaders().contains(Headers.CONTENT_TYPE)) {
            exchange.startBlocking();

            int code = FileService.getInstance().writeFile(exchange.getInputStream());

            exchange.getResponseHeaders().put(Headers.CONTENT_TYPE, "application/json");
            exchange.getResponseSender().send("{\"code\":\"" + code + "\"}");
        }

        exchange.getResponseHeaders().put(new HttpString("Access-Control-Allow-Origin"), "*");
        exchange.getResponseHeaders().put(new HttpString("Access-Control-Allow-Methods"), "OPTIONS, GET, POST, PUT, DELETE");
        exchange.getResponseHeaders().put(new HttpString("Access-Control-Allow-Headers"), "accept, authorization, content-type, x-requested-with");
        exchange.getResponseHeaders().put(new HttpString("Access-Control-Allow-Credentials"), "true");
        exchange.getResponseHeaders().put(new HttpString("Access-Control-Max-Age"), "60");
    }
}
