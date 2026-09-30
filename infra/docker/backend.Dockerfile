FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY backend/mvnw backend/pom.xml ./
COPY backend/.mvn ./.mvn
RUN chmod +x mvnw && ./mvnw -B dependency:go-offline
COPY backend/src ./src
RUN ./mvnw -B package -DskipTests

FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S portfolio && adduser -S portfolio -G portfolio
WORKDIR /app
COPY --from=build /app/target/portfolio-1.0.0.jar app.jar
USER portfolio
EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "-jar", "/app/app.jar"]
