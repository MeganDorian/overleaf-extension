package ru.mse.overleafextension.entity;

public class OverleafMessage {
    private String username;
    private String password;
    private String toAddress;
    private String text;
    private String subject;
    private int code;
    private String fileName;
    private String smtpService;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToAddress() {
        return toAddress;
    }

    public void setToAddress(String toAddress) {
        this.toAddress = toAddress;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getSmtpService() {
        return smtpService;
    }

    public void setSmtpService(String smtpService) {
        this.smtpService = smtpService;
    }

    @Override
    public String toString() {
        return "OverleafMessage{" +
                "username='" + username + '\'' +
                ", passwordHash='" + password.hashCode() + '\'' +
                ", toAddress='" + toAddress + '\'' +
                ", text='" + text + '\'' +
                ", subject='" + subject + '\'' +
                ", code=" + code +
                ", fileName='" + fileName + '\'' +
                ", smtpService='" + smtpService + '\'' +
                '}';
    }
}
