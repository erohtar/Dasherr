# Dasherr
A minimal and lightweight dashboard for your self-hosted services

## Intro
After trying out quite a few server dashboards and not quite finding the right one that:
- was minimal and static enough to not consume much resources (both on server and client)
- also informed me about the vitals and online status of my services

.. I eventually created my own. It started as a hobby weekend project but I have been using it as my only dashboard for a couple months now, and am rather happy with it.

## Installation
### With Docker
- Install any webserver Docker container (I myself use and recommend [this one](https://hub.docker.com/r/linuxserver/nginx))
- Here's a sample Docker configuration for the above container
```
version: "2.1"
services:
  nginx:
    image: lscr.io/linuxserver/nginx:latest
    container_name: nginx
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Kolkata
    volumes:
      - /home/pi/Docker/nginx/config:/config
    ports:
      - 80:80
      - 443:443
    restart: unless-stopped
```
- Drop all the files from Dasherr release into the `config/www` folder of nginx (or another webserver of your choice)
- If all went well, Dasherr will be running on port 80/443 of your server

### Without Docker
- Simply drop the files from Dasher release into your webserver's `www` folder
- If all went well, Dasherr will be running on port 80/443 of your server

## Configuration

### 'Page' 
The 'page' settings allow you to define some top-level settings:

`title` - Title of your dashboard

`theme` - Name of any theme of your choice from the themes defined in the Themes section

`openTab` - When you click on a service tile, this setting decides whether it's opened in a new tab or the same tab (possible values `new` and `same`)

Sample:
```
"page": {
	"title": "Dasherr",
	"theme": "Onedark",
	"openTab": "new"
}
```

### 'Widgets'
There's only one widget currently supported - Glances. That's not because of my laziness (even though I don't deny that trait), but to keep with the minimal design and stay light on resources.

Configurable settings:

`url` - Self-explanatory

`refreshMs` - How many ms to wait before updating (default is 5000ms or 5 seconds)

Sample:
```
"widgets": {
	"glances": {
		"url": "http://homeserver:61208/",
		"refreshMs": 5000
	}
}
```

### 'Sections'
This is an array of any number of individual Sections in your dashboard.

Configurable settings:

`name` - Self-explanatory

`tiles` - See below

`disable` - (Optional) If set to `1`, this Section will not be shown

### 'Tiles'
This is an array of any number of individual Tiles (services) in a section.

Configurable settings:

`name` - Self-explanatory

`url` - Self-explanatory

`faIcon` - The id of the FontAwesome icon you'd like to show for this service

`disable` - (Optional) If set to `1`, this Tile will not be shown

`disableCheck` - (Optional) If set to `1`, the online check will not be performed for this Tile

### 'Themes'
Dasherr comes with several built-in themes, and you can easily add your own by copying any existing theme in settings file and making edits to the hex color values and/or background.

The various supported settings per theme are:

`background` - This could be a local or web wallpaper background

`colorBg` - This is the background color of the page (only used if `background` is not set)

`colorPr` - This is the primary text color of the page

`colorSc` - This is the secondary text color of the page

`colorOn` - This is the color of the service **enabled** 'dot'

`colorOf` - This is the color of the service **disabled** 'dot'

Sample:
```
"Onedark": {
	"background": "",
	"colorBg": "#282c34",
	"colorPr": "#dfd9d6",
	"colorSc": "#98c379",
	"colorOn": "#98c379",
	"colorOf": "#282c34"
}
``` 

## Credits
- Heimdall : The first dashboard I used. I loved the live tiles and made quite a few new ones for the services that weren't supported out of the box. But since development had stopped long ago, and it was heavy on my server's resources (quite likely because I enabled so many live tiles), I stopped using it
- Flame : Very well made dashboard, and if it wasn't 100% static, I'd have maybe chosen this. I directly lifted the theme names and color swatches from Flame because they looked gorgeous to me, and for that I'm very grateful
- Dashy : Extremely flexible and beautifully made dashboard - the dev definitely is gifted. The inspiration to use online 'dots' came from here. I might have stayed with Dashy, but (at least at the time when I tried it) it took 1+ mins to compile and reload every time I made a little configuration change, so I had to start looking elsewhere
