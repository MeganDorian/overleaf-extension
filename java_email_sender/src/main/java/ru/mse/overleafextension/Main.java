package ru.mse.overleafextension;

import io.undertow.Undertow;
import io.undertow.server.handlers.BlockingHandler;
import io.undertow.server.handlers.PathHandler;
import ru.mse.overleafextension.boundary.ExitHandler;
import ru.mse.overleafextension.boundary.FileHandler;
import ru.mse.overleafextension.boundary.SendEmailHandler;
import ru.mse.overleafextension.control.FileService;

import java.io.IOException;

public class Main {

    public static void main(String[] args) throws IOException {
        FileService.getInstance().deleteFile();
//        try {
//            LogManager.getLogManager().readConfiguration(Main.class.getResourceAsStream("/logging.properties"));
//        } catch (SecurityException | IOException e1) {
//            e1.printStackTrace();
//        }

        PathHandler pathHandler = new PathHandler();
        pathHandler.addPrefixPath("/send", new SendEmailHandler());
        pathHandler.addPrefixPath("/file", new FileHandler());
        pathHandler.addPrefixPath("/exit", new ExitHandler());
        BlockingHandler blockingHandler = new BlockingHandler(pathHandler);

        Undertow server = Undertow.builder()
                .addHttpListener(19022, "localhost")
                .setHandler(blockingHandler).build();
        server.start();


    }
}