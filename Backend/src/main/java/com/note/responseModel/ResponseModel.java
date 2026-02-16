package com.note.responseModel;

import org.springframework.stereotype.Component;

@Component
public class ResponseModel {
    private Boolean errorStatus;
    private String message;
    private String token;
    private Long userId;

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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
