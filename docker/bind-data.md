# Data binding between host and docker container

## Simple example (nginx)

```bash
docker run -tid -p 8080:80 -v /home/philippequemener/dev_folder/personal-stuff/docker/nginx:/usr/share/nginx/html --name web nginx:latest
```

## Docker volume (still nginx)

### Create volume

```bash
docker create volume volume-name
```

### Inspect volume

```bash
docker volume inspect volume-name
```

**output :**

```json
{
    "CreatedAt": "2020-03-13T00:27:20+01:00",
    "Driver": "local",
    "Labels": {},
    "Mountpoint": "/var/lib/docker/volumes/volume-name/_data",
    "Name": "volume-name",
    "Options": {},
    "Scope": "local"
}
```

### Run docker with volume binded

```bash
docker run -tid --name web -p 8080:80 --mount source=volume-name,target=/usr/share/nginx/html nginx:latest
```

### Modify data in volume

```bash
sudo vi /var/lib/docker/volumes/volume-name/_data/index.html
```

### Delete volume

```bash
delete volume rm volume-name
```