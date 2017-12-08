Next: [Running a Docker Container](https://github.com/jenterkin/docker-microservice-example/tree/02-running-a-docker-container)
# What is Docker?
Docker is software that manages containers, container images, volumes, and  networks. It also provides an abstraction layer over containers. It supports creating reproducable containers, and running them in different configurations.

## Okay, but what is a container?
Many people think of virtual machines when they think of containers. While they are both used for virtualization at some level and share some concepts like "images", their implementations are very different, allowing for different feature sets.

Linux provides a method of running isolated environmets. Think `chroot`, but they provide a higher level of isolation. Linux containers share the same kernel as your host machine, and the processes are running on your host<sup>[1]</sup>. However, by default, they are only aware of other resources available in their environment. This provides a lower footprint than virtualmachines.

It is not important to understand the technical implementation for the purposes of this workshop, so you can think of them as heavily isolated environments in which processes are run.

### Footnotes
1. If you are on Linux, try running `ps fax` while a process is running in a container. You should see the process running in the output. Same for OS X and Windows, but you'll need to ssh into the Docker VM first.

### Takeaways
- Docker manages containers, images, data volumes, and networks.
- Docker is software that manages and provides an abstraction layer over containers.
- While containers are also a method of virtualization, containers have a lighter footprint.

Next: [Running a Docker Container](https://github.com/jenterkin/docker-microservice-example/tree/02-running-a-docker-container)