FROM python:3.12-slim

WORKDIR /project

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/
COPY entrypoint.sh .

RUN useradd -m appuser && \
  chown -R appuser:appuser /project && \
  chmod +x entrypoint.sh

USER appuser

EXPOSE 8000

ENTRYPOINT [ "./entrypoint.sh" ]
