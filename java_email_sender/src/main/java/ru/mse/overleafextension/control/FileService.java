package ru.mse.overleafextension.control;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;

public final class FileService {

    private static FileService INSTANCE;
    private final String FILE_NAME = "attachment.tmp";
    private final File FILE = new File(FILE_NAME);

    private int code;

    private FileService() {}

    public static FileService getInstance() {
        if(INSTANCE == null) {
            INSTANCE = new FileService();
        }
        return INSTANCE;
    }

    public synchronized int writeFile(String base64) throws IOException {
        byte[] decodedBytes = Base64.getDecoder().decode(base64);
        OutputStream out = new FileOutputStream(FILE);
        out.write(decodedBytes);
        out.close();

        this.code = (int)(Math.random() * Integer.MAX_VALUE);
        return this.code;
    }

    public synchronized File getFile(int code) {
        if (this.code == code)
            return FILE;
        else
            throw new IllegalArgumentException("File code is invalid - " + code);
    }

    public synchronized void deleteFile() {
        FILE.delete();
    }
}
