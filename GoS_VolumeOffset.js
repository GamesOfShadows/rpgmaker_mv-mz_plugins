/*:
* @plugindesc Change the volume-steps (make it 'x' quieter or louder)
* @author GamesOfShadows
* @help
* With this plugin (for RPGmaker MV & MZ) you can change the volume-steps.
* Default steps are 20, but with this plugin you can set the steps to 'x'. Instead having 100%, 80%, 60%, 40%, 20%, 0% you can have e.g. 100%, 90%, 80%, 70%,...
* 
* ------------------------------------------------------------
* 
* Version: 1.0
* 
* - You can do everything you want with this plugin
* - You can use it commercially
* - You DON'T need to credit me
* 
* It's just a short & simple plugin. ^^
* 
* @target MV
* 
* @param changeVolumeSteps
* @text Change the volume-steps.
* @desc Value by which to increase or decrease:
* @type number
* @default 10
*/

(() => {
	const pluginName = "GoS_VolumeOffset";
	let GoS_changeVolumeSteps = Number(PluginManager.parameters(pluginName).changeVolumeSteps);
	
	Window_Options.prototype.volumeOffset = function() {
		return GoS_changeVolumeSteps;
	};

})();