FROM openjdk:8-jdk-alpine

ADD target/dsbathweb-0.0.1-SNAPSHOT.war dsbathweb.war

EXPOSE 8081

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/dsbathweb.war"]
