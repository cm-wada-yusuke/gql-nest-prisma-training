#!/bin/bash

command=${@:1} 

docker run -it --rm \
  -v $PWD:/work \
  -v $HOME/.config/gcloud:/.config/gcloud \
  -w /work \
  -e GOOGLE_APPLICATION_CREDENTIALS=/.config/gcloud/application_default_credentials.json \
  --entrypoint "/bin/sh" \
  hashicorp/terraform:latest \
  -c "terraform $command"
