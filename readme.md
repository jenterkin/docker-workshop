Previous: [Docker Images](https://github.com/jenterkin/docker-microservice-example/tree/03-docker-images) | Next: [Managing State in Containers](https://github.com/jenterkin/docker-microservice-example/tree/05-managing-state-in-containers)
# cowserve 2.0
Maybe we don't want to contribute to the robot uprising with our sweet AI that makes a webpage all by itself, and want to make it ourselves. This looks similar to what we currently have. We just need to make some minor changes.
```Dockerfile
FROM python:3.6

WORKDIR /src

COPY index.html .

CMD python -m http.server
```

Here we have a new directive: `COPY`. This will copy the file or directory specified to the location specified. Where does `index.html` come from? We need to make it, so make `index.html` next to the `Dockerfile` and put a cow in it. Or whatever you'd like.

Once again we're going to build the container, but this time we're going to tag it with a version since it's new and improved.
```bash
docker build -t cowserve:2.0 .
```

When the image has finished building, run the container like last time, this time pointing at `cowserve:2.0`.

Now you should see the webpage that you created in `index.html` on http://localhost:8000. Try stopping the container, changing the text of `index.html`, and build the image again. If there were steps above the `COPY index.html .` step, Docker would not run those again thanks to Docker caching the layers.

This is cool, but it's tedious to have to rebuild the image and restart the container every time we change the `index.html` file. Let's change this. Stop the running container and run it again, but this time we'll mount our current directory to the `/src` directory in the container.
```bash
pid=$(docker run --rm -d -p "8000:8000" -v $(pwd):/src cowserve:2.0)
```

Now whenever you update `index.html` the page will be updated with your changes whenever you refresh.

## Takeaways
- The `COPY` directive copies a file or a directory to a location in the image.
- Use the `-v` flag in `docker run` to mount a directory on your host to the container.

Previous: [Docker Images](https://github.com/jenterkin/docker-microservice-example/tree/03-docker-images) | Next: [Managing State in Containers](https://github.com/jenterkin/docker-microservice-example/tree/05-managing-state-in-containers)