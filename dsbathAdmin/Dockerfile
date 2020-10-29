FROM openjdk:8-jdk-alpine

ADD target/dsbathadmin-0.0.1-SNAPSHOT.war dsbathadmin.war

EXPOSE 8091

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/dsbathadmin.war"]
