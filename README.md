# Spring Boot Backend with H2 Database by default

## Starting server on Linux Server
Firstly ``jar -xf vote-0.0.1-SNAPSHOT.jar`` and then `` java org.springframework.boot.loader.JarLauncher``

##Or
``-Dspring.profiles.active=dev "-Dspring.datasource.password=secret" -Dfile.encoding=windows-1252 -jar vote-0.0.1-SNAPSHOT.jar > /logsBFF.log``

# Angular
## Deploying
``ng build --prod --base-href ./``