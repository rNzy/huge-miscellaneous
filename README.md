# personal-stuff

## .gitconfig

```
[color]
	ui = auto
[color "branch"]
	current = yellow reverse
	local = yellow
	remote = green
[color "diff"]
	meta = yellow bold
	frag = magenta bold
	old = red bold
	new = green bold
	whitespace = red reverse
[color "status"]
	added = yellow
	changed = green
	untracked = cyan
[core]
	whitespace=fix,-indent-with-non-tab,trailing-space,cr-at-eol
[alias]
	a = add -p
	ci = commit
	cm = commit -m
	co = checkout
	cb = checkout -b
	st = status
	br = branch
	fe = fetch
	rb = rebase
	dc = diff --cached
	df = diff
	lg = log -p
	lol = log --graph --decorate --pretty=oneline --abbrev-commit
	lola = log --graph --decorate --pretty=oneline --abbrev-commit --all
	ls = ls-files

	# Show files ignored by git:
	ign = ls-files -o -i --exclude-standard
```
## bash aliases
```bash
# nvm
alias n12="nvm use 12"
alias n10="nvm use 10"
```

## deb VM screen resolution 

```bash
xrandr --newmode "2560x1440_60.00" 311.83  2560 2744 3024 3488  1440 1441 1444 1490  -HSync +Vsync
xrandr --addmode Virtual1 2560x1440_60.00
```

## deb VM change default editor

```bash
sudo update-alternatives --config editor
```

## nvm install

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash
```

## debug options

If ```Error: Command failed: /bin/sh -c autoreconf -ivf``` is encountered.
Try and install autoconf package.

```bash
sudo apt install autoconf
```