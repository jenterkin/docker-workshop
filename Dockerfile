FROM python:3.6

ENV PATH=$PATH:/usr/games

RUN apt-get -y update && \
    apt-get -y upgrade && \
    apt-get -y clean
RUN apt-get -y install cowsay fortune

RUN echo '<pre>' > index.html && \
    cowsay $(fortune) >> index.html && \
    echo '</pre>'

CMD python -m http.server
