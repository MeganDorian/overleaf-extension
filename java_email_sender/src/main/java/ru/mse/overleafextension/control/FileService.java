package ru.mse.overleafextension.control;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

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

    public synchronized int writeFile(InputStream is) throws IOException {
        OutputStream out = new FileOutputStream(FILE);
        byte[] buf = new byte[8192];
        int length;
        while ((length = is.read(buf)) != -1) {
            out.write(buf, 0, length);
        }
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
