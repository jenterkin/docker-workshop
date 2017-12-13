Previous: [Managing State in Containers](https://github.com/jenterkin/docker-microservice-example/tree/05-managing-state-in-containers) | Next: [Converting a Monolith to MIcroservices](https://github.com/jenterkin/docker-microservice-example/tree/07-monolith-to-microservices)

# Docker Compose
`docker-compose` is a great tool during development. It allows you to do some minimal orchestration and get rid of having to type out your `docker run` commands and manage the status of all of your containers for a service. Let's start off with the postgres container. Create a file called `docker-compose.yml` with the following:
```yaml
version: '3'
services:
    db:
        image: postgres:10.1
        volumes:
            - "pgdata:/var/lib/postgresql/data"
        environment:
            POSTGRES_PASSWORD: supersecret
            POSTGRES_USER: docker

volumes:
    pgdata:
```
From the same directory as the `docker-compose.yml` file, run `docker-compose up -d`. This will start the services defined in the file. You can use `docker-compose logs` to view the logs and various other subcommands. To launch an interactive psql shell on the postgres container, we can run
```bash
docker-compose exec db psql -U docker
```
Note that we can reference the service name (as defined in `docker-compose.yml`) in `docker-compose` commands.

If we hooked up our `cowserve` app to use postgres we could add that in there, too, and have it communicate with the postgres container.
```yaml
version: '3'
services:
    db:
        image: postgres:10.1
        volumes:
            - "pgdata:/var/lib/postgresql/data"
        env_file:
            - "./pg_creds.env"
    cowserve:
        build: ./path/to/cowserve/directory
        env_file:
            - "./pg_creds.env"
        ports:
            - "80:8000"
volumes:
    pgdata:
```
Don't worry that this is being glossed over here. The next exercise includes a working web service that includes a web, api, and frontend server, and a postgres container that uses `docker-compose` to run.

## Takeaways
- `docker-compose` is used for basic orchestration.
- Data volumes can be defined in the `docker-compose.yml` file, and do not need to be created prior.

Previous: [Managing State in Containers](https://github.com/jenterkin/docker-microservice-example/tree/05-managing-state-in-containers) | Next: [Converting a Monolith to MIcroservices](https://github.com/jenterkin/docker-microservice-example/tree/07-monolith-to-microservices)
