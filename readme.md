Previous: [Running a Docker Container](https://github.com/jenterkin/docker-microservice-example/tree/02-running-a-docker-container) | Next: [cowserve 2.0](https://github.com/jenterkin/docker-microservice-example/tree/04-cowserve-2.0)
# Docker Images
Docker images are essentially snapshots of a container. When we ran the commands above, this created a copy of the image and ran your command in that. Now we'll create our own image.

## Create a Dockerfile
Let's make a webserver that servs a file with a talking cow in it. In some directory make a `Dockerfile` called... `Dockerfile`. And put the following in it:
```Dockerfile
FROM python:3.6

RUN apt-get -y update && \
    apt-get -y upgrade && \
    apt-get -y clean
RUN apt-get -y install cowsay fortune

RUN echo '<pre>' > index.html && \
    cowsay $(fortune) >> index.html && \
    echo '</pre>'

CMD python -m http.server
```

Let's step through this file.
```Dockerfile
FROM python:3.6
```
The `FROM` instruction indicates that we are basing our image off of another image. We're going to base our image off of the official Python 3.6 image so we can use the `http` module to serve our web page.

```Dockerfile
RUN apt-get -y update && \
    apt-get -y upgrade && \
    apt-get -y clean
RUN apt-get -y install cowsay fortune

RUN echo '<pre>' > index.html && \
    cowsay $(fortune) >> index.html && \
    echo '</pre>'
```
The `RUN` instruction runs a command. Here we are installing our dependencies and creating the html file.
```Dockerfille
CMD python -m http.server
```
The `CMD` instruction states what command is run in a container by default. This means that when we run a container based off of this image, we do not need to specify a command.

Let's try building it with `docker build`. From the same directory of the `Dockerfile` run:
```bash
docker build -t cowserve .
```
Here we're saying "build a container named `cowserve` and use the Dockerfile in this directory."

Oops. Looks like it can't find the commands we installed.
```bash
/bin/sh: 1: fortune: not found
/bin/sh: 1: cowsay: not found
```
This is happening becuase the commands are not found in our path. We add that to our path. Let's add it under the `FROM` instruction and try building it again.
```Dockerfile
FROM python:3.6

ENV PATH=$PATH:/usr/games
```
Notice that we're building everything again. This is a result of Dockers' caching mechanism. In a Dockerfile every instruction represents a layer in an image. A layer is essentially a delta. Docker will not run a instruction again unless it makes sense to. In this case we added a instruction above other instructions, so it will run those again.

When the image finishes building, build it again and notice how docker uses the cache for each layer. This is because nothing changed so nothing had to be rebuilt. If we change the `cowsay` command, then that instruction and every instruction after that is run again.

Now build the image, and let's run it.

### Takeaways
- Images are defined in `Dockerfile`s that should be named `Dockerfile` by default.
- `FROM` indicates that the image is based on another image.
- `RUN` runs a command and creates an image layer.
- `ENV` creates sets an environment variable.
- `CMD` sets the default command to run when a container of the image is run.
- Docker caches each instruction in a `layer`.
- Layers are not rebuilt unless there's a reason - e.g. a prior direcive was changed.

# Running cowserve
Like before, to run the container we use the `docker run` command and point it at the image we just built:
```bash
pid=$(docker run --rm -d cowserve)
```
There are a couple of new things here. We're running `docker run` with the `-d` flag. This starts the container and detaches from it - or runs it in the background. When `docker run` is run with `-d` it returns the container id, which we are saving to `$pid`.

Now that we have the container running, let's check out the web page. `http.server` will use port `8000` by default, so go to http://localhost:8000.

This won't work - we still need to expose the port.

Let's go ahead and stop the container. Since we saved the container id to a variable we can do
```bash
docker stop $pid
```
If we did not save the pid, we could use `docker ps` to get the container id, or pass in `--name <some name>` to `docker run` and we can then reference that container by name in prior docker commands.

Now that the container is stopped, run the following command:
```bash
pid=$(docker run --rm -d -p "8000:8000" cowserve)
```

This will run the container and map the port `8000` on the host to `8000` on the container<sup>[1]</sup>. Now you should be able to see the page at http://localhost:8000.

_Tada!_ Now we can see our cow say something in a browser. Neat.

Now what if we want to, say, give the cow a longer tail? Well we can do that! Simply run
```bash
docker exec -it $pid bash
```
install an editor, and edit the `index.html` file. When you will be able to see your changes.

## Footnotes
1. [You may need to forward the Docker VM ports on macOS and Windows](https://wiki.archlinux.org/index.php/installation_guide).

## Takeaways
- Passing `-d` will run the container in the background and return the container id.
- Pass in `-p "<host_port>:<container_port>"` to `docker run` to expose a port.
- `docker stop <container id or name>` will stop the running container.
- `docker exec -it <container id or name> <shell>` will put you into an interactive terminal on the container.

Previous: [Running a Docker Container](https://github.com/jenterkin/docker-microservice-example/tree/02-running-a-docker-container) | Next: [cowserve 2.0](https://github.com/jenterkin/docker-microservice-example/tree/04-cowserve-2.0)