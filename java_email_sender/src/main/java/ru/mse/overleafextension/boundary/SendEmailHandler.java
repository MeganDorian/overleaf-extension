package ru.mse.overleafextension.boundary;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.undertow.server.HttpHandler;
import io.undertow.server.HttpServerExchange;
import io.undertow.util.Headers;
import io.undertow.util.HttpString;
import ru.mse.overleafextension.control.SmtpSenderService;
import ru.mse.overleafextension.entity.OverleafMessage;

import java.util.Date;

public class SendEmailHandler implements HttpHandler {

    @Override
    public void handleRequest(HttpServerExchange exchange) {
        try {
            System.out.println(new Date() + " " + SendEmailHandler.class.getName() + " Got HTTP request: " + exchange.getRequestHeaders());

            exchange.startBlocking();
            String request = HandlerUtils.readStream(exchange.getInputStream());

            ObjectMapper objectMapper = new ObjectMapper();
            OverleafMessage overleafMessage = objectMapper.readValue(request, OverleafMessage.class);
            SmtpSenderService smtpSender = new SmtpSenderService();
            smtpSender.sendEmail(overleafMessage);
        } catch (Exception e) {
            e.printStackTrace();
            exchange.setStatusCode(400);
            exchange.getResponseHeaders().put(Headers.CONTENT_TYPE, "application/json");
            exchange.getResponseSender().send("{\"errorDescription\":\""+e.getMessage() +"\"}");
            exchange.getResponseHeaders().put(new HttpString("Access-Control-Allow-Origin"), "*");
        }
    }
}
