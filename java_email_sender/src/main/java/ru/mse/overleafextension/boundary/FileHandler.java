package ru.mse.overleafextension.boundary;

import io.undertow.server.HttpHandler;
import io.undertow.server.HttpServerExchange;
import io.undertow.util.Headers;
import ru.mse.overleafextension.control.FileService;

import java.util.Date;

public class FileHandler implements HttpHandler {
    @Override
    public void handleRequest(HttpServerExchange exchange) throws Exception {
        System.out.println(new Date() + " " + FileHandler.class.getName() + " Got HTTP request: " + exchange.getRequestHeaders());

        exchange.startBlocking();
        String base64 = HandlerUtils.readStream(exchange.getInputStream());

        int code = FileService.getInstance().writeFile(base64);

        exchange.getResponseHeaders().put(Headers.CONTENT_TYPE, "application/json");
        exchange.getResponseSender().send("{\"code\":\""+ code +"\"}");
    }
}
