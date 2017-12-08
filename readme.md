Previous: [What is Docker?](https://github.com/jenterkin/docker-microservice-example/tree/01-what-is-docker) | Next: [Open a Shell in a Container](https://github.com/jenterkin/docker-microservice-example/tree/03-open-a-shell-in-a-container)
# Running a Docker Container
## Installation
If you have not yet installed Docker, do so now.

### Linux
Unless you're on a rolling release like Arch, you will probably want to grab it from [their website](https://www.docker.com/) or add their official repositories to your package manager.

### Mac
[Download page](https://www.docker.com/docker-mac).

### Windows
If you are running Home edition, you will want to grab [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/). This is because the latest releases use [Hyper-V](https://en.wikipedia.org/wiki/Hyper-V), which is only on available on Professional and higher.

Otherwise you can just download [the latest release](https://www.docker.com/docker-windows).

## Your first container (or not)
Run the following command:
```bash
docker run --rm alpine:latest echo "hello world"
```
Let's break apart this command.

- `docker` is the command that you will use to manage containers, images, volumes, and networks.
- `run` runs a container.
- `--rm` instructs Docker to destroy the container when the process finishes executing.
- `alpine:latest` is the tagged image (`image:tag`) that your container will be based off of. In this case it is the latest [Alpine](https://alpinelinux.org/)<sup>[1]</sup> image.
- `echo "hello world"` is the command we are telling Docker to run in the container.

When you run this command, Docker is going to see if you already have the image locally. If not, it is going to download it. Next, it is going to run the command in the container. Here you should see "hello world" printed to your screen. When the process in the container has finished, the container will exit. This is because Docker focuses on having one process run per container. When the process has ended, it assumes the container doesn't need to exist anymore and exits. You can still run multiple processes in a container, but the command you give to docker is the main process that has a `pid` of `1`.

### Footnotes
1. Alpine is a lightweight Linux distro used commonly in Linux containers for its' small image size and focus on security.

### Takeaways
- Run containers with the `docker run` command.
- Containers are instances of container images.
- The container will stop when the main process ends.

Previous: [What is Docker?](https://github.com/jenterkin/docker-microservice-example/tree/01-what-is-docker) | Next: [Open a Shell in a Container](https://github.com/jenterkin/docker-microservice-example/tree/03-open-a-shell-in-a-container)