package ru.mse.overleafextension.boundary;

import io.undertow.server.HttpHandler;
import io.undertow.server.HttpServerExchange;
import ru.mse.overleafextension.control.FileService;

import java.util.Date;

public class ExitHandler implements HttpHandler {
    @Override
    public void handleRequest(HttpServerExchange exchange) {
        System.out.println(new Date() + " " + ExitHandler.class.getName() + " Got HTTP request: " + exchange.getRequestHeaders());
        FileService.getInstance().deleteFile();
        System.exit(0);
    }
}
