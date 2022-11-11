<?php
if(!file_exists('settings.json') && file_exists('settings.sample.json')){
	copy('settings.sample.json','settings.json');
}
?>