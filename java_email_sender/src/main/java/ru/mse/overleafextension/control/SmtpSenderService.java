package ru.mse.overleafextension.control;

import ru.mse.overleafextension.entity.OverleafMessage;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;

import static ru.mse.overleafextension.control.SmtpServiceProvider.GMAIL;
import static ru.mse.overleafextension.control.SmtpServiceProvider.YANDEX;

public class SmtpSenderService {
    public void sendEmail(OverleafMessage overleafMessage) throws MessagingException, IOException {
        System.out.println(new Date() + "Got send email request overleafMessage: " + overleafMessage);

        SmtpServiceProvider serviceProvider = overleafMessage.getSmtpService().equals("gmail") ? GMAIL : YANDEX;

        Properties prop = new Properties();
        prop.put("mail.smtp.ssl.enable", "true");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.port", "465");
        prop.put("mail.smtp.socketFactory.port", "465");
        prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        if (serviceProvider == GMAIL) {
            prop.put("mail.smtp.host", "smtp.gmail.com");
        } else {
            prop.put("mail.smtp.host", "smtp.yandex.ru");
        }

        Session session = Session.getInstance(prop,
            new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(overleafMessage.getUsername(), overleafMessage.getPassword());
                }
            });
        session.setDebug(true);

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(overleafMessage.getUsername()));

        String toAddress = serviceProvider == GMAIL ? overleafMessage.getToAddress() : overleafMessage.getToAddress() + ", " + overleafMessage.getUsername();
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toAddress));
        message.setSubject(overleafMessage.getSubject());

        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent(overleafMessage.getText(), "text/plain; charset=utf-8");

        MimeBodyPart attachmentPart = new MimeBodyPart();
        attachmentPart.attachFile(FileService.getInstance().getFile(overleafMessage.getCode()));
        attachmentPart.setFileName(overleafMessage.getFileName());

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);
        multipart.addBodyPart(attachmentPart);
        message.setContent(multipart);

        Transport.send(message);
    }
}
