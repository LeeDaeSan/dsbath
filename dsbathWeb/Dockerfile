FROM openjdk:8-jdk-alpine

ADD target/dsbathwab-0.0.1-SNAPSHOT.war dsbathwab.war

EXPOSE 8081

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/dsbathwab.war"]
