package com.tmo.spring.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public final class NotFoundException extends RuntimeException {
    private String message;

    public NotFoundException(){

    }

    public NotFoundException(String message){
        this.message = message;
    }

    @Override
    public String getMessage(){
        return message;
    }
}
