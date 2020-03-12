simpleBinding: 
	docker run -tid -p 8080:80 -v /home/philippequemener/dev_folder/personal-stuff/docker/nginx:/usr/share/nginx/html --name web nginx:latest

volume:
	docker volume create volume-name

volumeBinding:
	docker run -tid --name web -p 8080:80 --mount source=volume-name,target=/usr/share/nginx/html nginx:latest

deleteContainer:
	docker rm -f web

deleteVolume:
	docker rm -f web
	docker volume rm volume-name