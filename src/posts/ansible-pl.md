---
time: 2014-05-21T12:50:46+08:00
---
# A Practical Ansible Project Layout

I started using Ansible last year, and two projects, I finally gained some confidence with it. In this post I am going to document one of my biggest gotcha when using it: the project layout.

Ansible has great official documents describing every aspects with great details regarding its usage.  There are also lots of articles or tutorials out there about things like creating roles, passing variables or carrying out specific tasks.

But one thing I keep wondering from the beginning is also one that seldom got mentioned: what the project layout should be? The official [Best Practices](https://docs.ansible.com/playbooks_best_practices.html) gives some hints about that, although not immediately applicable to a real-world project. But that is a good starting point to develop your own one depending on the use cases. Here I am going to present mine.

## The System To Manage

Suppose that I am developing a web application, which accepts and query a MySQL database for results. The system to be managed will look like this:


There are three environments for different purposes: **vagrant**, **stage** and **production**. Each environments may have same services running (like the MySQL), but with different configurations or on different number of hosts.

Note that hosts are not necessarily to be at a same location, some could be in an IDC or a PAAS like AWS, while other could be just local vagrant VMs. In this case the **vagrant** environments actually is just in vagrant.

Daily tasks include app deployment or configuration updates, which are accomplished by the [`ansible-playbook`](https://github.com/ansible/ansible/blob/devel/bin/ansible-playbook) command. But the command itself is quite cumbersome and prone to typo.

At a time only some hosts of an environments will change. Steps of setting up a service, as defined by [roles](https://docs.ansible.com/playbooks_roles.html#roles),  are the same accros environments, but with different sets of configurations. As the system grows, number of config files and their relationships will become a mess. Once you are in this situation, you will be less confident of each update and feel losing control of the system.

So the goals are:
* A clear layout hopefully scalable
* An easier command for common tasks

## The Project

### Directory Layout

Here is what the project layout looks like:

```
.
├── hosts/
│   ├── production
│   ├── stage
│   └── vagrant
├── library/
├── playbooks/
│   ├── files/
│   │   ├── mysql/
│   │   │   └── schema.sql
│   │   └── ssl/
│   │       ├── cert.crt
│   │       └── cert.pem
│   ├── vars/
│   │   ├── production/
│   │   │   ├── common.yml
│   │   │   ├── webapp.yml
│   │   │   └── mysql.yml
│   │   ├── stage/
│   │   │   ├── common.yml
│   │   │   ├── webapp.yml
│   │   │   └── mysql.yml
│   │   └── vagrant/
│   │       ├── common.yml
│   │       ├── app.yml
│   │       └── mysql.yml
│   └── sites.yml
├── roles/
│   ├── ANXS.mysql/
│   └── your.webapp/
├── Vagrantfile
├── ansible.cfg
└── setup.py
```

* `hosts/`:  folder for [inventory files](http://docs.ansible.com/intro_inventory.html), one for each environments
* `library/`: folder for custom [modules](http://docs.ansible.com/developing_modules.html)
* `playbooks/`:  folder for [playbooks](http://docs.ansible.com/playbooks.html) and related files or [vars_files](http://docs.ansible.com/playbooks_variables.html#variable-file-separation)
	* `files/`: static asset files [included by roles](https://docs.ansible.com/playbooks_roles.html#roles), like MySQL schemas or SSL certs files
	* `vars/`: [vars_files](http://docs.ansible.com/playbooks_variables.html#variable-file-separation) that will be included in playbooks, divided in to separate subfolders for different environments
	* `sites.yml`:  the main playbook file. Can be further divided into [multiple files](http://docs.ansible.com/playbooks_roles.html#task-include-files-and-encouraging-reuse) if need be
* `roles/`: folder for [roles](http://docs.ansible.com/playbooks_roles.html#roles)
* `Vagrantfile`: vagrant config file for development purpose
* `ansible.cfg`: Ansible [configuration file](http://docs.ansible.com/intro_configuration.html)
* `setup.py`: wrapper script around `ansible-playbook` for easier common tasks

### Hosts

Hosts for an environments are placed to its own inventory file. Here is what the `hosts/stage` looks like:

```
# vi: set ft=config :
webapp.stage.domain ansible_ssh_host=10.0.3.1
mysql.stage.domain ansible_ssh_host=10.0.3.2

[all:vars]
envn=stage

[webapps]
webapp.stage.domain

[mysqls]
mysql.stage.domain
```
It is just a typical [inventory file](http://docs.ansible.com/intro_inventory.html). Note that I added to _all_ hosts a `envn=stage` variable, which is important for playbooks to include the correct **vars_files**.

### Playbooks

Then entry point of [playbook](http://docs.ansible.com/playbooks.html)s is the `sites.yml`:

```yaml
---
- hosts: mysql
  sudo: true
  vars_files:
    - vars/{{envn}}/common.yml
    - vars/{{envn}}/mysql.yml
  roles:
    - ANXS.mysql
  tags: ['mysql']

- hosts: webapp
  sudo: true
  vars_files:
    - vars/{{envn}}/common.yml
    - vars/{{envn}}/mysql.yml
    - vars/{{envn}}/webapp.yml
  roles:
    - your.webapp
  tags: ['webapp']
```

Each playbook targets a host group, specifying the **roles** to run, and a bunch of **vars_files**.  Note the `envn` in the path of the **vars_files**, as defined in the inventory files. Leading to different variable files, they are the crucial points of environments separation.

Since you never run all playbooks at a time, in order to specify which playbooks to run, give some tags to playbooks.

### Kicking Off

Once you are done with all the file editing, it is time to kick off the provision. The entry point here is the `setup.py`, which a simple wrapper around `ansible-playbook` to save keystrokes and reduce possibility of errors. Here is the usage:

```
$ ./setup.py
usage: setup.py [-h] [-t TAGS] env
```

It takes a `env` argument indicating the environment to setup, and  optional `TAGS` indicating which **tagged playbooks** to run. Some examples:

```
$ ./setup.py stage -t database,webapp // provision database and webapp on stage
$ ./setup.py provision -t webapp // provision webapp on production
```

Here the **vagrant** environment is not governed by `setup.py`, it is done by the the [vagrant ansible provisioner](https://docs.vagrantup.com/v2/provisioning/ansible.html), and the setup are in the `Vagrantfile`.
