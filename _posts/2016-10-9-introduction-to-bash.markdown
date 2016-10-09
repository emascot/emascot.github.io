---
layout:     post
author:     "Eric Mascot"
title:      "Introduction to Bash"
subtitle:   
category:   Tutorial
tags:
  - bash
---

I have a few drafts of tutorials that I want to write.
I noticed that knowing how to use bash helps before going into any of those tutorials.
So let's get started with the Bourne Again SHell, better known as bash.

There are many shells. You can see what shells are on your computer by opening a terminal and typing `cat /etc/shells`.
Today, I will focus on bash. This isn't to say that bash is the best, but I will focus on bash because it is universal.
On any UNIX machine (linux and mac), you will find a command line app such as "Terminal".

![Terminal]({{ site.baseurl }}/img/introduction-to-bash/1.png "Terminal")

It is common to use `$` as a placeholder to show that you are typing into the command line.
Let's open terminal and practice some commands!

```bash
# Print working directory
$ pwd
# List
$ ls
# Make directory
$ mkdir test
# Change directory
$ cd test
# Vim text editor
$ vi hello
```

Let's make a simple script.
Type `i` to go into input mode and input.

```bash
echo "Hello World"
```

Hit `esc` to exit input mode and type `:` to enter command mode and `wq` to write and quit.
This script isn't executable yet.
We need to change the permissions to do that.

```bash
$ chmod 744 hello
$ ls -l
-rwxr--r--  1 ericmascot  staff       19 Sep 11 19:01 hello
```

You can see that I used the option `-l`.
This adds the option to list in long format.
In long format, it shows `rwxr--r--` where rwx stands for read, write, and execute.
The first three are for the owner, the middle three are users in the group, and the last three are for everyone else.
Now that the script is executable, let's run it.

```bash
$ ./hello
Hello World
```

We just wrote a script to echo the words "Hello World" and the shell ran the script.
This is handy to automate repetitive tasks.
This is also pretty risky if you're modifying or deleting files because there is no going back.

# Manual and Options

ls is a command you will use very often.
It has many options to configure how to display the directory's contents.
To see any command's documentation use `man`.

```bash
man ls
```

So if you want to list all (a), long (l), and human-readable (h), use `ls -alh`

Some universal options that most commands have are `--help` and `--version`.

# Pipes

You can use the output of one command to be the input of another.
A good example of using pipes is `grep`.
`grep` is a way to search through text.
`cat` is a command that prints a files contents.

```bash
$ cat /etc/shells | grep sh
/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

`grep` went through each line that was output from `cat` and only displays lines that have the pattern "sh"

# Output to file / Input from file

Using `>` will send the output of a command to a file.

Using `<` will use the file's contents as standard input for a command.

```bash
$ cat /etc/shells > shells.txt
$ grep bin < shells.txt
/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

Word of caution: using `>` will overwrite the file. Instead, you can use `>>` which will append it instead.

# Basic commands

Here's a list of some useful commands

```bash
# Print working directory
pwd
# Change directory
cd
# List directory contents
ls
# Make directory
mkdir
# Manual
man
# Link (create shortcut)
ln
# Move
mv
# Copy
cp
# Concatenate (print)
cat
# Change file mode (permissions)
chmod
# Change owner
chown
# Change group
chgrp
# Search for pattern
grep
```

# Regular expressions

To get a little more usage out of grep, it's useful to know some regular expressions.
`.` means "Any character".
`*` means "Match previous 0 or more times".
`+` means "Match previous 1 or more times".

```bash
$ cat /etc/shells | grep /bin/.sh
/bin/csh
/bin/ksh
/bin/zsh
$ cat /etc/shells | grep /bin/..sh
/bin/bash
/bin/tcsh
$ cat /etc/shells | grep /bin/.*sh
/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

Using these wildcards, we can do broader searches.

# Environment

The terminal has variables saved in its environment.
To see what is in your `HOME` variable, try this.

```bash
$ echo $HOME
```

This should print your home directory.
To see all the variables, use the command `env`.

The `PATH` is an important variable.
When you type a command, it searches through many folders.
The `PATH` is the list of folders it searches.
Let's make a directory for our custom scripts and add it to our path.

```bash
$ mkdir $HOME/bin
$ export PATH=$PATH:$HOME/bin
```

`export` saves the variable to the environment.
Now we can place scripts in this bin folder.
These scripts can be run from any folder.

# Scripting

There is so much to teach about scripting in bash but I'll just go through the basics.
First, you should start with a "hash bang" to state what command will run the script.

```bash
#!/bin/bash
```

$ is how you access variables.
You can access the command line arguments, which are numbered variables.

```bash
$1
```

You can run a command by putting it in parentheses.

```bash
$(cmd)
```

You can do arithmetic expressions using double parentheses.

```bash
$((expr))
```

You can use conditionals with if and terminate with fi

```bash
if [condition]
then
	# do stuff
fi
```

You can loop using for, do, and done

```bash
for var in var1 var2 var3
do
	# do stuff
done
```

Here's an example script.

```bash
#!/bin/bash

# Check if argument is provided
if [ -z $1 ];
then
	echo "Error: No argument";
	exit;
fi

# Iterate over files in directory
for var in $(ls);
do
	# Check if normal file
	if [ -f $var ];
	then
		echo "Creating ${var%.*}.$1";
		# Copy with new extension
		cp $var ${var%.*}.$1;
	fi
done
```

If we save this script as "chext" in the $HOME/bin directory we created earlier, we can run `cpext txt` in any directory.
This will make a copy of all the files in the current directory with the ".txt" extension.

# Prompt string

If you want to be a bash pro, you need to customize your prompt string.
On my mac, the default is `hostname:directory user$`.
That is because the PS1 variable in the environment is `\h:\W \u$`.
You can use custom scripts and colors to make this more useful.
Here's mine:

```bash
export PS1="\[\033[1;37m\]\u@\h:\[\033[1;36m\]\w\[\033[0m\]$(__git_ps1 " (%s)")\n\[\033[1;36m\]\$ \[\033[0m\]"
```

You can get the command for __git_ps1 [here](https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh).

Generate your own PS1 [here](http://bashrcgenerator.com/).

# LS Colors

You can also customize the colors for the output of `ls`.
To do this, change the LS_COLORS environment variable.
This is mine:

```bash
export LS_COLORS="di=1;36:fi=0:ln=37:pi=32:so=33:bd=34:cd=35:or=31"
```

You can generate colors [here](http://geoff.greer.fm/lscolors/).

# Aliases

You can make abbreviations or shortcuts using aliases.
For instance, instead of typing `ls -alh` every time, you can make a shortcut `ll`.

```bash
alias ll="ls -alh"
```

Check [here](https://github.com/robbyrussell/oh-my-zsh/blob/master/plugins/common-aliases/common-aliases.plugin.zsh) for some examples

List aliases using `alias`.

# Startup files

You can have all your customizations automatically loaded when you open a terminal.
When you log into a shell, it will run `$HOME/.bash_profile`.
For non-login shells, it will run `$HOME/.bashrc`.
I recommend putting common settings in `.bashrc` and add this to you `.bash_profile`.

```bash
if [ -f ~/.bashrc ]; then
   source ~/.bashrc
fi
```

`source` tells bash to run the file in the shell.

Here's an example

```bash
#Black       0;30     Dark Gray     1;30
#Blue        0;34     Light Blue    1;34
#Green       0;32     Light Green   1;32
#Cyan        0;36     Light Cyan    1;36
#Red         0;31     Light Red     1;31
#Purple      0;35     Light Purple  1;35
#Brown       0;33     Yellow        1;33
#Light Gray  0;37     White         1;37

# colors
BLUE="\[\033[1;36m\]"
WHITE="\[\033[1;37m\]"
NO_COLOR="\[\033[0m\]"

# prompt with git repo
source ~/.git-completion.bash
source ~/.git-prompt.sh
export GIT_PS1_SHOWDIRTYSTATE=1
export GIT_PS1_SHOWSTASHSTATE=1
export GIT_PS1_SHOWUNTRACKEDFILES=1
export GIT_PS1_SHOWUPSTREAM="auto"
export GIT_PS1_SHOWCOLORHINTS=1
PROMPT_COMMAND="__git_ps1 '$WHITE\u@\h:$BLUE\w$NO_COLOR' '$\n$BLUE\$ $NO_COLOR'"

# ls color
export CLICOLOR=1
export TERM=xterm-color
export LS_COLORS="di=1;36:fi=0:ln=37:pi=32:so=33:bd=34:cd=35:or=31"

# aliases
alias ff="find . -type f -name "
alias ls="ls -GF"
alias la="ls -aF"
alias ll="ls -lF"
alias lal="ls -alF"
alias ssh="ssh -Y"
alias mpi="mpirun -np 2"

# Intel MKL
source /opt/intel/compilers_and_libraries_2017/mac/bin/compilervars.sh intel64 -platform mac

# Python Autoenv
source /usr/local/opt/autoenv/activate.sh

# User bin
PATH="$HOME/bin:${PATH}"

# Java
PATH="/System/Library/Frameworks/JavaVM.framework/Versions/Current/Commands:$PATH"

# RVM
PATH="$GEM_HOME/bin:$HOME/.rvm/bin:$PATH"

# Go
export GOPATH=$HOME/Documents/Go
PATH=/usr/local/go/bin:$GOPATH/bin:$PATH

# TotalView
PATH=/Applications/toolworks/totalview.2016.06.21/bin:$PATH

export PATH

# Load RVM into a shell session *as a function*
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm"

```

# Conclusion

This wasn't super in depth.
It was meant to get you familiar with bash and its capabilities.
It takes a while to remember all the commands.
Once you get used to using the terminal, it is so useful.
You can automate almost everything you do.
If you want to go more in depth, check the [bash reference manual](https://www.gnu.org/software/bash/manual/bashref.html)
