package ru.mse.overleafextension.boundary;

import io.undertow.server.HttpHandler;
import io.undertow.server.HttpServerExchange;
import io.undertow.util.Headers;
import ru.mse.overleafextension.control.FileService;

import java.util.Date;

public class FileHandler implements HttpHandler {

    private CorsHandler corsHandler = new CorsHandler();

    @Override
    public void handleRequest(HttpServerExchange exchange) throws Exception {
        System.out.println(new Date() + " " + FileHandler.class.getName() + " Got HTTP request: " + exchange.getRequestHeaders());
        exchange.startBlocking();

        int code = FileService.getInstance().writeFile(exchange.getInputStream());

        corsHandler.handleRequest(exchange);
        exchange.getResponseHeaders().put(Headers.CONTENT_TYPE, "application/json");
        exchange.getResponseSender().send("{\"code\":\"" + code + "\"}");
    }
}
