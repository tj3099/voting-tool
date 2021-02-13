package de.tj9930.csdstuttgart.votingtool.interceptor;

import de.tj9930.csdstuttgart.votingtool.controller.QuestionController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class LogInterceptor implements HandlerInterceptor {

    Logger logger = LoggerFactory.getLogger(QuestionController.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object handler) {
            logger.info("[Incoming] " + request.getMethod() + " " + request.getRequestURL());
            return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception{
        if(response.getStatus() != 200){
            logger.error("[ERROR]" + request.getMethod() + " " + request.getRequestURL() + ": Status " + response.getStatus());
            if(response.getStatus() == 403 || response.getStatus() == 401) {
                logger.error("[SECURITY ISSUE]" + request.getMethod() + " " + request.getRequestURL() + ": Status " + response.getStatus());
                logger.error("[SECURITY ISSUE]" + request.toString() + "||" + response.toString());
            }
        }else {
            logger.info("[Outgoing] " + request.getMethod() + " " + request.getRequestURL() + ": Status " + response.getStatus());
        }
    }
}

