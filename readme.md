Previous: [Docker Compose](https://github.com/jenterkin/docker-microservice-example/tree/06-docker-compose) | Next: [Solution](https://github.com/jenterkin/docker-microservice-example/tree/08-microservices-solution)

# Converting a Monolith to Microservices
In this branch we have a Bitcoin exchange. You can start it by running the following, assuming you have [Vagrant](https://www.vagrantup.com/) installed:
```bash
$ vagrant up
```
This service has four parts:
* [Flask](http://flask.pocoo.org/) - An API backend
* [Webpack](https://webpack.js.org/) - A frontend server
* [Caddy](https://caddyserver.com/) - A webserver to handle requests
* [PostgreSQL](https://www.postgresql.org/) - A database

All of which are all being run and managed by [Supervisor](http://supervisord.org/).

The goal here is to strip out the Vagrant environment and put each of these services into their own containers, and hook them up using `docker-compose`. This exercise should put together everything you've learned here, plus a little more, all of which can be found on the [Compose File Reference](https://docs.docker.com/compose/compose-file/#service-configuration-reference).

A good starting point is to look at the `supervisord.conf` file to see how each service is run.

If you get stuck and want a hint, take a look at one [possible solution](https://github.com/jenterkin/docker-microservice-example/tree/08-microservices-solution).

Previous: [Docker Compose](https://github.com/jenterkin/docker-microservice-example/tree/06-docker-compose) | Next: [Solution](https://github.com/jenterkin/docker-microservice-example/tree/08-microservices-solution)
