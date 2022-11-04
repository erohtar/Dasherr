![image](https://user-images.githubusercontent.com/5120628/199825180-c7130c78-2e36-475b-a2d7-7c04c71ed513.png)

# Dasherr
A minimal and lightweight dashboard for your self-hosted services

## Features:
- Extremely lightweight (loads instantly), and responsive (uses Bootstrap framework)
- Shows Temperature, CPU load and Memory used by tapping into Glances API (default 5s updates)
- Online check of services (checked only on page load/refresh to stay light on resources)
- Themes
- FontAwesome icons
- Wallpaper backgrounds
- Section/tile/widget can be quickly disabled without having to remove its data from settings (in case you might want to enable/use it later)
- All settings in a single easy to edit json file

## Installation
### With Docker
- Install any webserver Docker container (I myself use and recommend [this one](https://hub.docker.com/r/linuxserver/nginx) )
- Drop all the files from Dasherr release into the `config/www` folder of nginx (or another webserver of your choice)
- If all went well, Dasherr will be running on port 80/443 of your server

### Without Docker
- Simply drop the files from Dasher release into your webserver's `www` folder
- If all went well, Dasherr will be running on port 80/443 of your server

## Configuration
A sample settings.json is included in the release. It should be used as a template to edit/add your own Sections and Tiles (services). All the configuration settings are explained below.

### Page
The 'page' settings allow you to define these top-level options:
- `title` - Title of your dashboard
- `theme` - Name of any theme of your choice from the themes defined in the Themes section
- `openTab` - When you click on a service tile, this setting decides whether it's opened in a new tab or the same tab (possible values `new` and `same`)

Sample:
```
"page": {
	"title": "Dasherr",
	"theme": "Onedark",
	"openTab": "new"
}
```

### Widgets
There's only one widget currently supported - Glances. That's not because of my laziness (even though I don't deny that trait), but to keep with the minimal design and stay light on resources.

Configurable settings:
- `url` - Self-explanatory
- `refreshMs` - How many ms to wait before updating (default is 5000ms or 5 seconds)

Sample:
```
"widgets": {
	"glances": {
		"url": "http://homeserver:61208/",
		"refreshMs": 5000
	}
}
```

### Sections
This is an array of any number of individual Sections in your dashboard.

Configurable settings:
- `name` - Self-explanatory
- `tiles` - See below
- `disable` - (Optional) If set to `1`, this Section will not be shown

### Tiles
This is an array of any number of individual Tiles (services) in a section.

Configurable settings:
- `name` - Self-explanatory
- `url` - Self-explanatory
- `faIcon` - The id of the FontAwesome icon you'd like to show for this service
- `disable` - (Optional) If set to `1`, this Tile will not be shown
- `disableCheck` - (Optional) If set to `1`, the online check will not be performed for this Tile

Sample (Section and Tiles):
```
"sections": [
	{
		"name": "Maintenance",
		"tiles": [
			{
				"name": "Portainer",
				"url": "http://homeserver:9000/",
				"faIcon": "fab fa-docker"
			},
			{
				"name": "FileBrowser",
				"url": "http://homeserver:8020/",
				"faIcon": "fa fa-folder-tree"
			}
		]
	}
]
```

### Themes
Dasherr comes with several built-in themes, and you can easily add your own by copying any existing theme in settings file and making edits to the hex color values and/or background.

Configurable settings:
- `background` - This could be a local or web wallpaper background
- `colorBg` - This is the background color of the page (only used if `background` is not set)
- `colorPr` - This is the primary text color of the page
- `colorSc` - This is the secondary text color of the page
- `colorOn` - This is the color of the service **enabled** 'dot'
- `colorOf` - This is the color of the service **disabled** 'dot'

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
- [Flame](https://github.com/jordanm88/flame-dashboard) : Very well made and clean looking static dashboard. I took the theme names and color swatches from Flame because they looked gorgeous to me, and for that I'm very grateful
- [Dashy](https://github.com/lissy93/dashy) : Extremely flexible and beautifully made dashboard - the dev definitely is gifted. The inspiration to use online 'dots' came from here
- [r/selfhosted](https://www.reddit.com/r/selfhosted/) : I got interested into self-hosting towards the end of 2021, and since then I've learnt a lot from this subreddit