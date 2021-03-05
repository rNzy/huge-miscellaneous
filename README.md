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
	fta = fetch --all --tags
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
alias n8="nvm use 8"

# python
alias p3="python3"
alias sourcev="source .venv/bin/activate"
```

### switched to zsh + ohmyzsh recently

```
plugins=(git z)

# use node_modules bin
alias nodepath="export PATH=./node_modules/.bin:$PATH"

# npm commands
alias rdev="npm run dev"
alias serve="npm run serve"
alias start="npm run start"
alias devpub="npm run devpublish"
alias dev='f() { npm run dev:$1 };f'
alias test='f() { npm run test:$1 };f'

# ohmyzsh ll is fucking trash
alias ll='ls -alF'

# grep colors
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'
```

## deb VM screen resolution

```bash
xrandr --newmode "2560x1440_60.00" 311.83  2560 2744 3024 3488  1440 1441 1444 1490  -HSync +Vsync
xrandr --addmode Virtual1 2560x1440_60.00
```

### finding out monitor names

```bash
xrandr | grep -e " connected [^(]" | sed -e "s/\([A-Z0-9]\+\) connected.*/\1/"
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

If `Error: Command failed: /bin/sh -c autoreconf -ivf` is encountered.
Try and install autoconf package.

```bash
sudo apt install autoconf
```

## never forget vscode

### format on save

```json
"editor.formatOnSave": true
```

### watch files for a large workspace

```bash
sudo vi /etc/sysctl.conf
# add this line to the file : fs.inotify.max_user_watches=524288
sudo sysctl -p
```

**File : files.watcherExclude**

```json
"files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true
}
```
