package ru.mse.overleafextension.boundary;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class HandlerUtils {
    public static String readStream(InputStream is) throws IOException {
        BufferedInputStream in = new BufferedInputStream(is);
        byte[] contents = new byte[16384];
        int bytesRead = 0;
        StringBuilder sb = new StringBuilder();
        while((bytesRead = in.read(contents)) != -1) {
            sb.append(new String(contents, 0, bytesRead, StandardCharsets.UTF_8));
        }
        return sb.toString();
    }
}
