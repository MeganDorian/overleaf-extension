package ru.mse.overleafextension.boundary;

import io.undertow.server.HttpHandler;
import io.undertow.server.HttpServerExchange;
import io.undertow.util.HttpString;

public class CorsHandler implements HttpHandler {
    @Override
    public void handleRequest(HttpServerExchange exchange) throws Exception {
        exchange.getResponseHeaders().put(new HttpString("Access-Control-Allow-Origin"), "*");
        exchange.getResponseHeaders().put(new HttpString("Access-Control-Allow-Methods"), "OPTIONS, GET, POST, PUT, DELETE");
        exchange.getResponseHeaders().put(new HttpString("Access-Control-Allow-Headers"), "accept, authorization, content-type, x-requested-with");
        exchange.getResponseHeaders().put(new HttpString("Access-Control-Allow-Credentials"), "true");
        exchange.getResponseHeaders().put(new HttpString("Access-Control-Max-Age"), "60");
    }
}
