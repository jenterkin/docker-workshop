FROM python:3.6

WORKDIR /src

COPY index.html .

CMD python -m http.server
