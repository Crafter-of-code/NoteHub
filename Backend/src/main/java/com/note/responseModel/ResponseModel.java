package com.note.responseModel;

import org.springframework.stereotype.Component;

@Component
public class ReponseModel {
    private Boolean errorStatus;
    private String message;


    public Boolean getErrorStatus() {
        return errorStatus;
    }

    public void setErrorStatus(Boolean errorStatus) {
        this.errorStatus = errorStatus;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
