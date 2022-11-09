package ru.mse.overleafextension.boundary;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.undertow.server.HttpHandler;
import io.undertow.server.HttpServerExchange;
import io.undertow.util.Headers;
import ru.mse.overleafextension.control.SmtpSenderService;
import ru.mse.overleafextension.entity.OverleafMessage;

import java.util.Date;

public class SendEmailHandler implements HttpHandler {

    private CorsHandler corsHandler = new CorsHandler();

    @Override
    public void handleRequest(HttpServerExchange exchange) throws Exception {
        try {
            System.out.println(new Date() + " " + SendEmailHandler.class.getName() + " Got HTTP request: " + exchange.getRequestHeaders());

            exchange.startBlocking();

            String requestJson = HandlerUtils.readStream(exchange.getInputStream());

            ObjectMapper objectMapper = new ObjectMapper();
            OverleafMessage overleafMessage = objectMapper.readValue(requestJson, OverleafMessage.class);
            SmtpSenderService smtpSender = new SmtpSenderService();
            smtpSender.sendEmail(overleafMessage);

            corsHandler.handleRequest(exchange);
        } catch (Exception e) {
            e.printStackTrace();
            exchange.setStatusCode(400);
            corsHandler.handleRequest(exchange);
            exchange.getResponseHeaders().put(Headers.CONTENT_TYPE, "application/json");
            exchange.getResponseSender().send("{\"errorDescription\":\""+e.getMessage() +"\"}");
        }
    }
}
