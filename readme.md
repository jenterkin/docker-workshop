Previous: [cowserve 2.0](https://github.com/jenterkin/docker-microservice-example/tree/04-cowserve-2.0) | Next: [Docker Compose](https://github.com/jenterkin/docker-microservice-example/tree/06-docker-compose)
# Managing State with Containers
So far we have only looked at stateless containers. Generally we want to keep them this way as it makes it easier to understand, debugging, and test. In addition to that, `docker run <image>` is always going to run a new instance of the image, so any state stored in a container does not persist. Surely we need state, so how do we manage that with containers? We can mount a local directory to the container, but keeping state in your repo isn't very clean. We can use data volumes to solve this problem.

## Data Volumes
Data volumes are directories that are stored on disk, but they get put in a special location so they aren't touched on accident and stay out of your way.

## Creating a postgres container
Let's say we need a database. We can simply use the official postgres image.
```bash
pid=$(docker run --rm -e POSTGRES_PASSWORD=supersecret -e POSTGRES_USER=docker -d postgres:10.1)
```

Here you can log into postgres and make some data.
```bash
psql -U docker -c "create database test";
```

But when you stop the container and run that command again, the data is no longer there. We can create a data volume and mount that to the container.
```bash
docker volume create pgdata
pid=$(docker run --rm -e POSTGRES_PASSWORD=supersecret -e POSTGRES_USER=docker -d -v pgdata:/var/lib/postgresql/data postgres:10.1)
```

Now if you run another postgres container and use the same `-v` argument, your data will persist.

## Takeaways
- Use data volumes to handle persistent state.
- Use `docker volume create <volume name>` to create a data volume.

Previous: [cowserve 2.0](https://github.com/jenterkin/docker-microservice-example/tree/04-cowserve-2.0) | Next: [Docker Compose](https://github.com/jenterkin/docker-microservice-example/tree/06-docker-compose)
