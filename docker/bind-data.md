# Data binding between host and docker container

## Example : nginx

docker run -tid -p 8080:80 -v /home/philippequemener/dev_folder/personal-stuff/docker/nginx:/usr/share/nginx/html --name web nginx:latest
