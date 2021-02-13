FROM adoptopenjdk/openjdk15
ARG JAR_FILE=target/*.jar
ENV SPRING_PROVILES_ACTIVE='dev'
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]