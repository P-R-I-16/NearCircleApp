package com.nearcircle.responce;

import org.springframework.http.HttpStatus;

import java.sql.Blob;


public class GeneralResponse {

    private HttpStatus status;
    private String message;
    private Object data;

private Blob blob;

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Blob getBlob() {
        return blob;
    }

    public void setBlob(Blob blob) {
        this.blob = blob;
    }
}
