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