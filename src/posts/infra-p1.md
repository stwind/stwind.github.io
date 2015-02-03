---
title: Infrastructure As Code Part 1
time: 2014-02-10T08:29:26+08:00
---

Still remember the first time I used [vagrant](http://www.vagrantup.com/) to provision a vm for development with just one simple command `vagrant provision`, I was using [chef](http://www.getchef.com/chef/) back then, it was like magic that all tedious works of copying commands and editing config files were automated, there is nothing more satisfying than watching step after step being on the screen. 

Last month I had freedom to implement a service from scratch and I decided to spend more time on the idea **Infrastructure As Code** with a tool that I found more amazing than chef, [Ansible](http://www.ansible.com/). Now few weeks later I finally have something that works, I would like to write down here some thoughts during the process. It would be a series of posts as I have more exciting progress.

[readmore]: #goals

## Goals

Description is simple but implementation is difficuclt. Basically I want:

* One git repo for all config files.
* Two steps for all tasks
	1. Edit config files
	2. Apply config changes with one command
* Developers can have a clone of the whole or part of the insfrastruce in their local machine with Vagrant.

## Components

Our service is written in Erlang to provide an HTTP API. Here are the basic components of the infrasture, each along with the chosen application to use:

* Application: Erlang, Mysql, Rabbitmq, Ejabberd
	- development
	- staging
	- production
* Source Control and Issue Tracker: [Gitlab](http://gitlab.org/)
* Build Server and APT Server: [Freight](https://github.com/rcrowley/freight) and Nginx
* DNS: bind9
* Monitoring: [shinken](http://www.shinken-monitoring.org/), [flapjack](http://flapjack.io/)
* Reverse Proxy: Nginx
* Load Balancer: Qingcloud
* VPN: openvpn by Qingcloud

[Qingcloud](https://www.qingcloud.com/) is a Chinese Iaas startup that provides excellent cloud computing services like aws, it has builtin supports of load balancers and vpn setup. The web UI is easy to use, so I just do these parts manually for now, but they can still be automated if necessary via the [HTTP API](https://docs.qingcloud.com/api/index.html).

For deployment of erlang applications, we need a build server to package each release as `.deb`, and cache it in an apt server. App server can just run `apt-get install <app-name>=<app-ver>` to upgrade/downgrade.

## Typical Use Cases

Here are some frequent use cases, don't worry about the details, I will explain in next posts.

### Adding new host instances

1. Edit `hosts` files, add a entry for each new instance, with attributes like IP and grouping
2. Run `setup.py <env> -t <tag> …` command to provision the new instances.

### Building and Deploying Application

1. Edit `vars/app.yml`, specify desired version.
2. Run `setup.py <env> -t buildapp,deployapp`

## Next

Actually it is quite complicated under the hood to make things look simple. In next posts, I will show some code which one can play with using vagrant on local machine, as well as some (my) best practices of ansible.
